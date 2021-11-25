import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Unidade {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    nome: string

    @Column()
    tipo_logradouro: string

    @Column()
    logradouro: string

    @Column()
    numero: number

    @Column()
    bairro: string

    @Column()
    cidade: string

    @Column()
    estado: string
}
