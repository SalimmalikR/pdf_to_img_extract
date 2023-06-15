module.exports=(error,req,res,next) => {
    error.statuscode= error.statuscode || 500;
    error.status=error.status || 'error';
    res.status(error.statuscode).json({
        statuscode:error.statuscode,
        status:error.status,
        message:error.message
    })
}