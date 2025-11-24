import crypto from 'crypto'

// Security utilities following OWASP and NIST standards

export class SecurityUtils {
  // Rate limiting storage (in production, use Redis)
  private static rateLimitStore = new Map<string, { count: number; resetTime: number }>()

  // Input validation and sanitization
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return ''
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000) // Limit length
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email) && email.length <= 254
  }

  static validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long')
    }
    
    if (password.length > 128) {
      errors.push('Password must not exceed 128 characters')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter')
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number')
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character')
    }
    
    // Check for common passwords
    const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein']
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
    return phoneRegex.test(phone)
  }

  static validateSSN(ssn: string): boolean {
    // Basic SSN format validation (XXX-XX-XXXX)
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/
    return ssnRegex.test(ssn)
  }

  // Rate limiting
  static checkRateLimit(
    identifier: string, 
    limit: number = 100, 
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): { allowed: boolean; resetTime: number } {
    const now = Date.now()
    const record = this.rateLimitStore.get(identifier)
    
    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs })
      return { allowed: true, resetTime: now + windowMs }
    }
    
    if (record.count >= limit) {
      return { allowed: false, resetTime: record.resetTime }
    }
    
    record.count++
    return { allowed: true, resetTime: record.resetTime }
  }

  // CSRF Protection
  static generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  static validateCSRFToken(token: string, sessionToken: string): boolean {
    // In production, validate against stored session token
    const expectedToken = crypto
      .createHmac('sha256', sessionToken)
      .update('csrf-protection')
      .digest('hex')
    
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))
  }

  // Secure random token generation
  static generateSecureToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  // Hash password securely
  static async hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
    const generatedSalt = salt || crypto.randomBytes(16).toString('hex')
    const hash = crypto
      .pbkdf2Sync(password, generatedSalt, 100000, 64, 'sha512')
      .toString('hex')
    
    return { hash, salt: generatedSalt }
  }

  static async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const verifyHash = crypto
      .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
      .toString('hex')
    
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(verifyHash))
  }

  // Data encryption for sensitive data
  static encrypt(text: string, key: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher('aes-256-cbc', key)
    cipher.setAutoPadding(true)
    
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    return iv.toString('hex') + ':' + encrypted
  }

  static decrypt(encryptedText: string, key: string): string {
    const textParts = encryptedText.split(':')
    const iv = Buffer.from(textParts[0], 'hex')
    const encrypted = textParts[1]
    
    const decipher = crypto.createDecipher('aes-256-cbc', key)
    decipher.setAutoPadding(true)
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }

  // SQL Injection protection
  static sanitizeSQL(input: string): string {
    if (typeof input !== 'string') return ''
    
    return input
      .replace(/['"\\;]/g, '') // Remove SQL delimiters
      .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/gi, '') // Remove SQL keywords
      .replace(/--/g, '') // Remove SQL comments
      .replace(/\/\*/g, '') // Remove SQL comments
      .trim()
  }

  // File upload security
  static validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
    const errors: string[] = []
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    
    if (file.size > maxSize) {
      errors.push('File size exceeds 10MB limit')
    }
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed')
    }
    
    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase()
    const dangerousExtensions = ['exe', 'bat', 'cmd', 'scr', 'pif', 'com']
    if (extension && dangerousExtensions.includes(extension)) {
      errors.push('File extension not allowed')
    }
    
    // Check for malicious file names
    const maliciousPatterns = [/\.\./, /\/\//, /[<>:"|?*]/]
    if (maliciousPatterns.some(pattern => pattern.test(file.name))) {
      errors.push('Invalid file name')
    }
    
    return {
      isValid: errors.length === 0,
      errors
    }
  }

  // Session security
  static generateSessionId(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  static validateSession(session: any): boolean {
    if (!session) return false
    
    // Check session age
    const maxAge = 24 * 60 * 60 * 1000 // 24 hours
    if (Date.now() - session.createdAt > maxAge) {
      return false
    }
    
    // Check required fields
    if (!session.userId || !session.role) {
      return false
    }
    
    return true
  }

  // Audit logging
  static logSecurityEvent(
    event: string,
    userId?: string,
    ip?: string,
    userAgent?: string,
    details?: any
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'SECURITY',
      event,
      userId,
      ip,
      userAgent,
      details,
      severity: this.getEventSeverity(event)
    }
    
    console.log(JSON.stringify(logEntry))
    
    // In production, send to secure logging service
    // this.sendToLogService(logEntry)
  }

  private static getEventSeverity(event: string): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const criticalEvents = [
      'UNAUTHORIZED_ACCESS',
      'CSRF_ATTEMPT',
      'SQL_INJECTION_ATTEMPT',
      'XSS_ATTEMPT',
      'BRUTE_FORCE_ATTEMPT'
    ]
    
    const highEvents = [
      'PRIVILEGE_ESCALATION',
      'DATA_BREACH',
      'MALICIOUS_FILE_UPLOAD'
    ]
    
    if (criticalEvents.includes(event)) return 'CRITICAL'
    if (highEvents.includes(event)) return 'HIGH'
    if (event.includes('FAILED')) return 'MEDIUM'
    return 'LOW'
  }

  // Content Security Policy helpers
  static getCSPNonce(): string {
    return crypto.randomBytes(16).toString('base64')
  }

  // IP-based security
  static getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    
    if (forwarded) {
      return forwarded.split(',')[0].trim()
    }
    
    if (realIP) {
      return realIP
    }
    
    return 'unknown'
  }

  // Data masking for logs
  static maskSensitiveData(data: string, maskChar: string = '*'): string {
    if (!data || data.length < 4) return maskChar.repeat(4)
    
    const start = data.substring(0, 2)
    const end = data.substring(data.length - 2)
    const middle = maskChar.repeat(data.length - 4)
    
    return start + middle + end
  }
}

export default SecurityUtils