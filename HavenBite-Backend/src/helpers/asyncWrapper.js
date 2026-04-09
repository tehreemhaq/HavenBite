
// asyncWrapper with Promise.resolve


function asyncWrapper(controllerFn){
    return (req,res,next)=>{
    Promise
    .resolve(controllerFn(req,res,next))
    .catch((err)=> next(err))
    }

}

export { asyncWrapper }


 

// asyncWrapper with try/catch

// function asyncWrapper(fnFromParams) {
//     async (req, res, next) => {
//         try {
//             await fnFromParams(req, res, next)
//         }
//         catch {
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             })
//         }

//     }

// }