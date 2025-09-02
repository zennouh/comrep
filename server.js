import app from './app.js'

const PORT = process.env.PORT || 4040

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})

// Handle server errors (e.g., port in use)
app.on('error', (error) => {
  console.error('❌ Server error:', error.message)
  process.exit(1)
})

// Handle unexpected crashes
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason)
  process.exit(1)
})
