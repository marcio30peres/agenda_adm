import { Router } from 'express'
import colaboradorRouter from './colaborador.routes'
import unidadeRouter from './unidade.routes'

const routes = Router()
routes.use('/unidade', unidadeRouter)
routes.use('/colaborador', colaboradorRouter)

export default routes
