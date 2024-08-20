const Movie = require('../Models/movieModels')



module.exports={
    AddMovie:async (req , res,next )=>{
        const {rating,movieid,title , poster_path ,imbd_rating} = req.body 
     
        const r = rating 
        const mi= movieid
        const t = title 
        const p = poster_path  
        const i = imbd_rating
        const ui = req.user._id
        
        try{
                    if((await Movie.countDocuments({ rating:r,movieid:mi,title:t , poster_path:p,imbd_rating:i,user_id:ui}))==0){
                        console.log('user doesnt have this movie in his watched list yet ')
                        const m = await Movie.create({rating:r,movieid:mi,title:t,poster_path:p,imbd_rating:i,user_id:ui})
                        console.log('added the moveie the the database')
                        res.status(200).json(m)
                        
                    }
                    else
                    {
                        res.json({"message":"movie allready exists in the database"})
                    }    
            }
             
            catch(error){
             res.status(400).json({error:error})
        }
    }
    ,
    ShowMovies:async (req , res , next)=>{
        const ui = req.user._id
        if((await Movie.countDocuments({})==0)){
            res.status(200).json({"message":"no movies exist here"})
        }else{
            const results = await Movie.find({user_id:ui}).sort({createdAt:-1})
            res.status(200).json(results)
        }
    }
    ,
    ShowMovie:async(req , res , next )=>{
        const {id} = req.params
        const ui = req.user._id
        if((await Movie.countDocuments({})==0)){
            res.status(200).json({"message":"no movies exist here"})
        }else{
            const results = await Movie.findOne({movieid:id,user_id:ui })
            if(results){
                res.status(200).json(results)
            }else{
                res.status(404).json({"message":"couldnt find this movie for the user"})
            }
        }

    }
    ,
    DeleteMovie:async(req,res,next)=>{
        if((await Movie.countDocuments({title : req.body.title}))==0){
            res.status(404).json({"message":"couldnt find this movie mate"})
        }else{
            const deletedmovies = await Movie.deleteOne({title:req.body.title})
            res.status(200).json({"message":"movie was deleted successfully"})
        }
    }
    ,
    ModifieMovie:async(req,res,next)=>{
        
    }
}