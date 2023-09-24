import { Request, Response } from "express";
import { ActivateUserUseCase } from "../../application/activeUser.UseCase";



export class ActivateUserController {
    constructor(readonly activateUserUseCase : ActivateUserUseCase) {}
    async run(req:Request, res:Response) {
        try {
            let {
                uuid,
            } = req.body
        
            let activateUser = await this.activateUserUseCase.run(uuid)

            if(activateUser){
                return res.status(200).send({
                    status:"succes",
                    data:{
                        activateUser
                    }
                })
            }
            if (!activateUser) {
                return res.status(404).send({
                    status: "error",
                    message: "No user found with the provided UUID."
                });
            }
        } catch (error) {   
            return res.status(500).send({
                status: "error",
                message: "An error occurred while activating the user."
            });
        }
    }
}