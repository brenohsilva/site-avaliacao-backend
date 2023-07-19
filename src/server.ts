import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import {z} from 'zod'

const prisma = new PrismaClient ({
    log: ['query'],
})

interface RouteParams {
    title: string;
}


async function bootstrap() {

    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    // Requests test //
    fastify.get('/count', async () => {
        
      const count = await prisma.results.groupBy({
        by: ['title'],
        where: {
            title: 'Produtos',
        },
        _count: {
            title: true,
        },
    })
        
        return count.map((item) => {
            return {
                count: item._count.title,
            }
        })
    })
    
    // Requests test //
    fastify.get('/averige', async () => {
        const averige = await prisma.results.aggregate ({
            where: {
                title: 'Produtos',
            },
            
            _avg: {
                stars: true,
            },
        })

        return averige._avg.stars;
    })

    fastify.get('/allresults/:title', async(request) => {
        
        const { title } = request.params as RouteParams;
        
        const [averige, count] = await Promise.all([
            prisma.results.aggregate({
                where: {
                    title,
                },
                _avg: {
                    stars: true,
                },
            }),

            prisma.results.count({
                where: {
                    title,
                }
            })
        ])
    const resultado = {
        media: averige._avg.stars,
        count,
    }

    return {resultado}
    
    })

    fastify.post('/results', async (request, reply) => {

        const createResultsBody = z.object({
           title: z.string(),
           stars: z.number().gte(1)
        }) 

        const {title, stars} = createResultsBody.parse(request.body)

        await prisma.results.create({
            data: {
                title,
                stars
            }
        })

        return reply.status(201).send({title, stars})

    })

    await fastify.listen({port: 3333})

}

bootstrap()