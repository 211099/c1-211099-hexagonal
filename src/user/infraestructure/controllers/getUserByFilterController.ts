import { Request, Response } from "express";
import { GetUserByFilterUseCase } from "../../application/getUserByFilterUseCase";



export class GetUserByFilterController {
    constructor(readonly getUserByFilterUseCase : GetUserByFilterUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                filter,
                name,
                phone_number,
                email,
            } = req.query
            let getUserByFilter = await this.getUserByFilterUseCase.run(filter as string, email as string, name as string, phone_number as string)

            if(getUserByFilter){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        getUserByFilter
                    }
                })
            } else{
                return res.status(404).send({
                    status: "error",
                    message: "User not found."
                });
            }

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "An error occurred while list the user."
            });   
        }
    }
}