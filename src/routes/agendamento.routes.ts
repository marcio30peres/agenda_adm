import { Router } from 'express'
import { getRepository } from 'typeorm'
import Agendamento from '../models/Agendamento'
import Colaborador from '../models/Colaborador'

const agendamentoRouter = Router()

agendamentoRouter.post('/create', async (request, response) => {
    try {
        const repo = getRepository(Agendamento)
        const res = await repo.save(request.body)
        return response.status(201).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

agendamentoRouter.get('/list', async (request, response) => {
    try {
        const repo = getRepository(Agendamento)
        const res = await repo.find({relations: ["colaborador", "unidade"]})
        if(res.length == 0)
            return response.status(200).json({msg: "Nenhum agendamento encontrado!"})
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

agendamentoRouter.get('/find/:id', async (request, response) => {
    try {
        const repo = getRepository(Agendamento)
        const res = await repo.findOne(request.params.id, {relations: ["colaborador", "unidade"]})
        return response.status(200).json(res)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

agendamentoRouter.get('/clbd/:id', async (request, response) => {
    try {
        const repo = getRepository(Colaborador)
        const res = await repo.findOne(request.params.id)
        const repo_agdm = getRepository(Agendamento)
        const agdms = await repo_agdm.find({
            where: {
                colaborador: res
            },
            relations: ["colaborador", "unidade"]
        })
        return response.status(200).json(agdms)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

agendamentoRouter.put('/update/:id', async (request, response) => {
    try {
        const repo = getRepository(Agendamento)
        const undd = await repo.findOne(request.params.id)
        repo.merge(undd, request.body)
        repo.save(undd)
        return response.status(200).json(undd)
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

agendamentoRouter.delete('/delete/:id', async (request, response) => {
    try {
        const repo = getRepository(Agendamento)
        repo.delete(request.params.id)
        return response.status(200).json({
            msg: `Agendamento id: ${request.params.id} excluído.`
        })
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

export default agendamentoRouter