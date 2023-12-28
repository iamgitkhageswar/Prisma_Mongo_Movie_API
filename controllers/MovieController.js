import prisma from "../DB/db.config.js"

export const index = async (req ,res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 1
    if(page <=0) {
        page = 1
    }
    if(limit <=0 || limit > 100) {
        limit = 10
    }

    const skip = (page -1) * limit


    const movies = await prisma.movie.findMany({
        take:limit,
        skip:skip,
        include:{
            Cast:{
                select:{
                    name:true,
                    description:true
                }
            },
            _count:{
                select:{
                    Cast:true
                }
            }
        }
    })

    const totalMovies = await prisma.movie.count()
    const totalPages = Math.ceil(totalMovies / limit)

    return res.json({status:200 , movies ,meta:{
        totalPages,
        currentPage:page,
        limit:limit
    }})
}

export const store = async (req ,res) => {
    const {name} = req.body
    const movie = await prisma.movie.create({
        data:{
            name:name
        }
    })

    return res.json({status:200 , message:"Movie added successfully!" ,movie})
}

// * Update
export const update = async (req , res) => {
    const {id} = req.params
    const {name} = req.body
    await prisma.movie.update({
        data:{
            name:name
        },
        where:{
            id:id
        }
    })
   return res.json({status:200 , message:"Movie updated successfully!"})
}

// * delete
export const destroy = async (req ,res) => {
    const {id} = req.params
    await prisma.movie.delete({
        where:{
            id:id
        }
    })

    return res.json({status:200 , message:"Movie deleted successfully!"})
}

// * Searching
export const search = async (req ,res) => {
    const query = req.query.q
    console.log("the search is" ,query)

    const movies = await prisma.movie.findMany({
        where:{
            name:{
                contains:query,
                mode:"insensitive"
            }
        }
    })

    return res.json({status:200 , movies})
}