import { Router } from 'express'
import { getRepository } from 'typeorm'
import Colaborador from '../models/Colaborador'

const colaboradorRouter = Router()

colaboradorRouter.post('/create', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        const res = await repo.save(request.body)
        return response.status(201).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

colaboradorRouter.get('/list', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        const res = await repo.find()
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

colaboradorRouter.get('/find/:id', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        const res = await repo.findOne(request.params.id)
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

colaboradorRouter.put('/update/:id', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        const undd = await repo.findOne(request.params.id)
        repo.merge(undd, request.body)
        repo.save(undd)
        return response.status(200).json(undd)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

colaboradorRouter.delete('/delete/:id', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        repo.delete(request.params.id)
        return response.status(200).json({
            msg: `Colaborador id: ${request.params.id} excluído.`
        })
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

export default colaboradorRouter