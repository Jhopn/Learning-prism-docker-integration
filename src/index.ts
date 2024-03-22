import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

// Obtem dados
app.get(("/estoque"), async (req:Request, res:Response) =>{
    const obtemDados = await prisma.estoque.findMany()
    return res.json(obtemDados);
});

// Adiciona
app.post(("/estoque"), async(req:Request, res:Response) =>{
    const {nome, quantidade, preco, descricao} = req.body
    const addDados = await prisma.estoque.create({
        data:{
            nome,
            quantidade,
            preco,
            descricao,
        }
    })
    return res.json(addDados)
});

// Atualiza
app.put(("/estoque/:id/:nome/:quantidade/:descricao/:preco"), async(req:Request, res:Response) =>{
    const {id, nome, quantidade, descricao, preco} = req.params
    const attProduto = await prisma.estoque.update({
        where:{
            id: Number(id)
        },
        data:{
            nome,
            quantidade: Number(quantidade),
            descricao,
            preco: Number(preco)
        }
    })
    return res.json(attProduto)
});

app.delete(("/estoque/:id"), async (req:Request, res:Response)=>{
    const {id} = req.params
    const apagaDado = await prisma.estoque.delete({
        where:{
            id: Number(id)
        }
    })
    return res.json(apagaDado)
})

app.listen(2222, () => console.log("Servidor Online..."))