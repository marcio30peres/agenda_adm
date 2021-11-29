import { Router } from 'express'
import { getRepository } from 'typeorm'
import Arquivo from '../models/Arquivo'

const arquivoRouter = Router()

arquivoRouter.post('/upload', async (request, response) => {
    try {
        let arquivo = request.files.arquivo

        var novo = new Arquivo()
        novo.nome = arquivo.name
        novo.conteudo = arquivo.data.toString('base64')
        novo.mimeType = arquivo.mimetype

        const repo = getRepository(Arquivo)
        await repo.save(novo)
        
        return response.status(200).json({msg: "Upload completo!"})
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})

arquivoRouter.get('/download/:id', async (request, response) => {
    try {
        const repo = getRepository(Arquivo)
        const res = await repo.findOne(request.params.id)
        var conteudo = Buffer.from(res.conteudo, 'base64')
        response.writeHead(200, {
        'Content-Type': res.mimeType,
        'Content-Disposition': 'attachment; filename=' + res.nome,
        'Content-Length': conteudo.length
        })
        response.write(conteudo)
        response.end()
    } catch (err) {
        return response.status(400).json({msg: err.message})
    }
})


export default arquivoRouter