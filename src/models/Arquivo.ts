import {
    Column, 
    Entity, 
    JoinColumn, 
    ManyToOne, 
    OneToOne, 
    PrimaryGeneratedColumn
} from "typeorm";
import Agendamento from "./Agendamento";

@Entity()
export default class Arquivo {
    @PrimaryGeneratedColumn('increment')
    id: number
    
    @Column()
    nome: string

    @Column()
    mimeType: string

    @Column()
    conteudo: string
}
