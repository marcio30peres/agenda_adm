import { Router } from 'express'
import agendamentoRouter from './agendamento.routes'
import colaboradorRouter from './colaborador.routes'
import unidadeRouter from './unidade.routes'

const routes = Router()
routes.use('/unidade', unidadeRouter)
routes.use('/colaborador', colaboradorRouter)
routes.use('/agendamento', agendamentoRouter)

export default routes
