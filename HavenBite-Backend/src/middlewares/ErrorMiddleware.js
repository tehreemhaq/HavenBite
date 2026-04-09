
// this function was passing each error to frontend and this is not a recommended approach for better development

// function errMiddleware(err, req, res, next) {
//     let statusCode = err.statusCode || 500
//     let message = err.message || "internal serve error"
//     let details = err.errors || []

//     console.log(err)


//     if (err.code === 11000 && err.keyValue) {

//         const conflictingFields = Object.keys(err.keyValue);
//         const errorMessage = conflictingFields
//             .map(field => `${field} already exists`)
//             .join(" & ");

//         statusCode = 409;
//         message = errorMessage
//         details = conflictingFields;
//     }



//     res.status(statusCode).json({
//         success: false,
//         message,
//         details

//     })
// }






import { ApiError } from "../helpers/ApiErrors.js"

// Named error types that are safe to handle with a fixed response
const NAMED_ERROR_RESPONSES = {
  JsonWebTokenError: { statusCode: 401, message: "unauthorized access" },
  TokenExpiredError:  { statusCode: 401, message: "unauthorized access" },
  ValidationError:    { statusCode: 400, message: null }, // null = dynamic message
}

function errMiddleware(err, req, res, next) {
  console.error("ERROR:", err)

  // ── Your own intentional errors — safe to expose as-is ────────────────
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      details: err.errors ?? []
    })
  }

  // ── MongoDB duplicate key ──────────────────────────────────────────────
  if (err.code === 11000 && err.keyValue) {
    const conflictingFields = Object.keys(err.keyValue)
    const message = conflictingFields.map(f => `${f} already exists`).join(" & ")
    return res.status(409).json({ success: false, message, details: conflictingFields })
  }

  // ── Named errors — JWT, Mongoose validation ────────────────────────────
  const namedError = NAMED_ERROR_RESPONSES[err.name]
  if (namedError) {
    // ValidationError builds message dynamically from schema errors
    const message = namedError.message
      ?? Object.values(err.errors ?? {}).map(e => e.message).join(", ")

    return res.status(namedError.statusCode).json({
      success: false,
      message,
      details: []
    })
  }

  // ── Unexpected system error — never expose internals ───────────────────
  return res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
    details: []
  })
}

export { errMiddleware }


