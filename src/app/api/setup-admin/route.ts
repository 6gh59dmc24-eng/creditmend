import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Create admin user if it doesn't exist
    let user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 12)
      
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: "Admin User",
          role: "ADMIN",
          isActive: true
        }
      })

      // Create staff profile for admin
      await prisma.staffProfile.create({
        data: {
          userId: user.id,
          employeeNumber: "ADMIN001",
          department: "Administration",
          position: "System Administrator",
          isActive: true,
          permissions: ["ALL"]
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Admin user created successfully",
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    console.error("Setup error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create admin user" },
      { status: 500 }
    )
  }
}