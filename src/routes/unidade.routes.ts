import { Router } from 'express'
import { getRepository } from 'typeorm'
import Unidade from '../models/Unidade'

const unidadeRouter = Router()

unidadeRouter.post('/create', async (request, response) => {
    try {
        const repo = getRepository(Unidade)
        const res = await repo.save(request.body)
        return response.status(201).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

unidadeRouter.get('/list', async (request, response) => {
    try {
        const repo = getRepository(Unidade)
        const res = await repo.find()
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

unidadeRouter.get('/find/:id', async (request, response) => {
    try {
        const repo = getRepository(Unidade)
        const res = await repo.findOne(request.params.id)
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

unidadeRouter.put('/update/:id', async (request, response) => {
    try {
        const repo = getRepository(Unidade)
        const undd = await repo.findOne(request.params.id)
        repo.merge(undd, request.body)
        repo.save(undd)
        return response.status(200).json(undd)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

unidadeRouter.delete('/delete/:id', async (request, response) => {
    try {
        const repo = getRepository(Unidade)
        repo.delete(request.params.id)
        return response.status(200).json({
            msg: `unidade id: ${request.params.id} excluída.`
        })
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

export default unidadeRouter