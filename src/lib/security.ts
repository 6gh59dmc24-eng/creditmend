// Security utilities following OWASP and NIST standards

export class SecurityUtils {
  // Rate limiting storage (in production, use Redis)
  private static rateLimitStore = new Map<
    string,
    { count: number; resetTime: number }
  >();

  // Input validation and sanitization
  static sanitizeInput(input: string): string {
    if (typeof input !== 'string') return '';

    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .substring(0, 1000); // Limit length
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254;
  }

  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (password.length > 128) {
      errors.push('Password must not exceed 128 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    // Check for common passwords
    const commonPasswords = [
      'password',
      '123456',
      'qwerty',
      'admin',
      'letmein',
    ];
    if (commonPasswords.includes(password.toLowerCase())) {
      errors.push('Password is too common');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  static validatePhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/;
    return phoneRegex.test(phone);
  }

  static validateSSN(ssn: string): boolean {
    // Basic SSN format validation (XXX-XX-XXXX)
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    return ssnRegex.test(ssn);
  }

  // Rate limiting
  static checkRateLimit(
    identifier: string,
    limit: number = 100,
    windowMs: number = 15 * 60 * 1000 // 15 minutes
  ): { allowed: boolean; resetTime: number } {
    const now = Date.now();
    const record = this.rateLimitStore.get(identifier);

    if (!record || now > record.resetTime) {
      this.rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      return { allowed: true, resetTime: now + windowMs };
    }

    if (record.count >= limit) {
      return { allowed: false, resetTime: record.resetTime };
    }

    record.count++;
    return { allowed: true, resetTime: record.resetTime };
  }

  // CSRF Protection
  static generateCSRFToken(): string {
    const array = new Uint8Array(32);
    globalThis.crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static async validateCSRFToken(
    token: string,
    sessionToken: string
  ): Promise<boolean> {
    // In production, validate against stored session token
    const msgBuffer = new TextEncoder().encode('csrf-protection');
    const keyBuffer = new TextEncoder().encode(sessionToken);

    const key = await globalThis.crypto.subtle.importKey(
      'raw',
      keyBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await globalThis.crypto.subtle.sign(
      'HMAC',
      key,
      msgBuffer
    );
    const expectedToken = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return token === expectedToken;
  }

  // Secure random token generation
  static generateSecureToken(length: number = 32): string {
    const array = new Uint8Array(length);
    globalThis.crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Hash password securely
  static async hashPassword(
    password: string,
    salt?: string
  ): Promise<{ hash: string; salt: string }> {
    const enc = new TextEncoder();
    const generatedSalt =
      salt ||
      Array.from(globalThis.crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await globalThis.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode(generatedSalt),
        iterations: 100000,
        hash: 'SHA-512',
      },
      keyMaterial,
      { name: 'HMAC', hash: 'SHA-512', length: 512 },
      true,
      ['sign', 'verify']
    );

    const exportedKey = await globalThis.crypto.subtle.exportKey('raw', key);
    const hash = Array.from(new Uint8Array(exportedKey))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return { hash, salt: generatedSalt };
  }

  static async verifyPassword(
    password: string,
    hash: string,
    salt: string
  ): Promise<boolean> {
    const { hash: verifyHash } = await this.hashPassword(password, salt);
    return hash === verifyHash;
  }

  // Data encryption for sensitive data
  static async encrypt(text: string, key: string): Promise<string> {
    const enc = new TextEncoder();
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(key),
      'AES-CBC',
      false,
      ['encrypt']
    );
    const iv = globalThis.crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await globalThis.crypto.subtle.encrypt(
      { name: 'AES-CBC', iv },
      keyMaterial,
      enc.encode(text)
    );

    const ivHex = Array.from(iv)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const encryptedHex = Array.from(new Uint8Array(encrypted))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return ivHex + ':' + encryptedHex;
  }

  static async decrypt(encryptedText: string, key: string): Promise<string> {
    const parts = encryptedText.split(':');

    // Convert hex strings back to Uint8Arrays
    const ivMatch = parts[0].match(/.{1,2}/g)?.map(byte => parseInt(byte, 16));
    const dataMatch = parts[1]
      .match(/.{1,2}/g)
      ?.map(byte => parseInt(byte, 16));

    if (!ivMatch || !dataMatch)
      throw new Error('Invalid encrypted data format');

    const iv = new Uint8Array(ivMatch);
    const data = new Uint8Array(dataMatch);

    const enc = new TextEncoder();
    const keyMaterial = await globalThis.crypto.subtle.importKey(
      'raw',
      enc.encode(key),
      'AES-CBC',
      false,
      ['decrypt']
    );

    const decrypted = await globalThis.crypto.subtle.decrypt(
      { name: 'AES-CBC', iv },
      keyMaterial,
      data
    );

    return new TextDecoder().decode(decrypted);
  }

  // SQL Injection protection
  static sanitizeSQL(input: string): string {
    if (typeof input !== 'string') return '';

    return input
      .replace(/['"\\;]/g, '') // Remove SQL delimiters
      .replace(
        /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b/gi,
        ''
      ) // Remove SQL keywords
      .replace(/--/g, '') // Remove SQL comments
      .replace(/\/\*/g, '') // Remove SQL comments
      .trim();
  }

  // File upload security
  static validateFileUpload(file: File): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (file.size > maxSize) {
      errors.push('File size exceeds 10MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
    }

    // Check file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    const dangerousExtensions = ['exe', 'bat', 'cmd', 'scr', 'pif', 'com'];
    if (extension && dangerousExtensions.includes(extension)) {
      errors.push('File extension not allowed');
    }

    // Check for malicious file names
    const maliciousPatterns = [/\.\./, /\/\//, /[<>:"|?*]/];
    if (maliciousPatterns.some(pattern => pattern.test(file.name))) {
      errors.push('Invalid file name');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Session security
  static generateSessionId(): string {
    const array = new Uint8Array(32);
    globalThis.crypto.getRandomValues(array);
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  static validateSession(session: Record<string, unknown> | null): boolean {
    if (!session) return false;

    // Check session age
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    const createdAt = session.createdAt as number;
    if (Date.now() - createdAt > maxAge) {
      return false;
    }

    // Check required fields
    if (!session.userId || !session.role) {
      return false;
    }

    return true;
  }

  // Audit logging
  static logSecurityEvent(
    event: string,
    userId?: string,
    ip?: string,
    userAgent?: string,
    details?: unknown
  ): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'SECURITY',
      event,
      userId,
      ip,
      userAgent,
      details,
      severity: this.getEventSeverity(event),
    };

    console.log(JSON.stringify(logEntry));

    // In production, send to secure logging service
    // this.sendToLogService(logEntry)
  }

  private static getEventSeverity(
    event: string
  ): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    const criticalEvents = [
      'UNAUTHORIZED_ACCESS',
      'CSRF_ATTEMPT',
      'SQL_INJECTION_ATTEMPT',
      'XSS_ATTEMPT',
      'BRUTE_FORCE_ATTEMPT',
    ];

    const highEvents = [
      'PRIVILEGE_ESCALATION',
      'DATA_BREACH',
      'MALICIOUS_FILE_UPLOAD',
    ];

    if (criticalEvents.includes(event)) return 'CRITICAL';
    if (highEvents.includes(event)) return 'HIGH';
    if (event.includes('FAILED')) return 'MEDIUM';
    return 'LOW';
  }

  // Content Security Policy helpers
  static getCSPNonce(): string {
    const array = new Uint8Array(16);
    globalThis.crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }

  // IP-based security
  static getClientIP(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }

    if (realIP) {
      return realIP;
    }

    return 'unknown';
  }

  // Data masking for logs
  static maskSensitiveData(data: string, maskChar: string = '*'): string {
    if (!data || data.length < 4) return maskChar.repeat(4);

    const start = data.substring(0, 2);
    const end = data.substring(data.length - 2);
    const middle = maskChar.repeat(data.length - 4);

    return start + middle + end;
  }
}

export default SecurityUtils;
