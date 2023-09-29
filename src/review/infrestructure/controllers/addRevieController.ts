import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { AddReviewUseCase } from "../../application/addReviewUseCase";


export class AddReviewController {

    constructor(readonly addReviewUseCase: AddReviewUseCase) { }

    async run(req: Request , res: Response) {
        try {

            let {
                uuid_user,
                uuid_book,
                date,
                review  
            } = req.body;
           
           
            const miuuid: string = uuid();
            let newReview = await this.addReviewUseCase.run(miuuid,uuid_user,uuid_book,date,review);

            if (newReview) {
                return res.status(201).send({
                    status: "success",
                    data: {
                        newReview: newReview
                    }
                });
            } else {
                return res.status(500).send({
                    status: "error",
                    message: "An error occurred while adding the review."
                });
            }

        } catch (error) {
            if (error instanceof Error) {
                if (error.message.startsWith('[')) {
                    return res.status(400).send({
                        status: "error",
                        message: "Validation failed",
                        errors: JSON.parse(error.message)
                    });
                }
            }
            return res.status(500).send({
                status: "error",
                message: "An error occurred while adding the book."
            });
        }
    }
}



