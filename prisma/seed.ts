import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient

async function main() {

    const resultsone = await prisma.results.create({
        data: {
            title: "Produtos",
            stars: 4

        }
    })

    const resultstwo = await prisma.results.create({
        data: {
            title: "Entregas",
            stars: 5

        }
    })

    const resultsthree = await prisma.results.create({
        data: {
            title: "Atendimento",
            stars: 3

        }
    })
}

main()