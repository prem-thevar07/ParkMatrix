🚗 Smart Campus Parking System (SCETathon 2k26)

A distributed IoT-based smart parking management system designed to digitize campus parking operations using RFID-based vehicle authentication, real-time slot tracking, and a centralized web platform.

📌 Overview

This project solves the problem of inefficient parking in large campuses by providing:

Real-time parking availability
Automated RFID-based entry system
Centralized monitoring and logging
Integrated web platform for users and admins

The system is built using a combination of ESP32-based IoT devices, a Node.js backend, and a web interface, all synchronized through a single backend server.

🏗️ System Architecture
IoT Layer (Parking Gate)
ESP32 microcontroller
RC522 RFID reader
Servo motor (gate control)
OLED display (local status)
Backend Server
Node.js + Express
Central database (MongoDB)
Handles authentication, slot management, and logs
Web Platform
Vehicle registration
RFID linking
QR code generation (privacy-safe)
Admin dashboard (logs + availability)
Entrance Display
Shows zone-wise real-time parking availability
🔁 How It Works
User Registration
Users register their vehicle on the website
RFID UID is linked to the vehicle
A secure QR code is generated (no personal data stored)
RFID-Based Entry
Vehicle taps RFID at parking gate
ESP32 reads UID and sends it to backend
Server validates vehicle and slot availability
Access Control
If valid:
Slot count is updated
Entry is logged
Gate opens via servo motor
If invalid:
Access is denied
Real-Time Synchronization
Backend updates slot availability
Website dashboard and entrance display reflect changes instantly
🔐 Key Features
🔑 RFID-based secure vehicle authentication
⚡ Fast entry response (~500 ms)
📊 Real-time slot tracking
🌐 Unified backend for IoT and web
🧾 Admin logs (entry/exit tracking)
🔒 Privacy-safe QR system (no direct data exposure)
🏫 Scalable architecture for large campuses (3000+ vehicles)
🛠️ Tech Stack

Hardware

ESP32
RC522 RFID Module
SG90 Servo Motor
0.96" OLED Display

Software

Node.js + Express
MongoDB
React (Frontend)



##technicals


To run the backend :
npm start


To run the frontend :
npm start


to demostrate dashboard without iot device:

inside postman do a post request to :- http://localhost:5000/api/parking/update/  or  http://{IP ADDRESS}:5000/api/parking/update/

with body format , {"uid":"334f5a6","zone":"A","action":"entry","datetime":"07/03/2026 1211"}
                   {"uid":"334f5a6","zone":"A","action":"exit","datetime":"07/03/2026 1211"}