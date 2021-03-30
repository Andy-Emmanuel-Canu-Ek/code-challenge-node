import { Request, Response } from "express";
import { handleError } from "../helpers/handleError";
import EventModel, {Event} from '../models/eventModel'
class EventController {

  public async getEvents(req: Request, res: Response) {
    const user = req.body.user_token_obj.user_id;
    const event_list = await EventModel.find({user});

    return res.json({
      ok: true,
      event_list
    })

  }

  public async saveEvent(req: Request, res: Response) {
    try{
      const user = req.body.user_token_obj.user_id;
      const {start_date, end_date} = req.body
     
      const event_exists: Boolean = await EventModel.exists({"$and" : [{user}, {"end_date" : {"$gt" : start_date}}, {"start_date" : {"$lt" : end_date}}]});
      if(event_exists){
        return res.status(401).json({
          ok: false,
          msg: "Existen eventos guardados para esa misma fecha"
        })
      }

      const event: Event = new EventModel(req.body)
      event.user = user;

      await event.save()

      const event_list = await EventModel.find({user});

      res.json({
        ok: true,
        msg: "Evento de usuario creado correctamente",
        event_list
      })
    }catch(error){
      handleError(error, res);
    }
  }

  public async updateEvent(req: Request, res: Response) {
    const user_id = req.body.user_token_obj.user_id;
    const event_id = req.params.id;
    try{
      const event: any = await EventModel.findById(event_id);

      if(!event){
        return res.status(404).json({
          ok: false,
          msg: "El evento que desea actualizar no existe"
        })
      }

      if (event.user.toString() !== user_id){
        return res.status(401).json({
          ok: false,
          msg: "No tiene permisos para poder modificar el evento"
        })
      }

      const updateEvent = {
        ...req.body,
        user: user_id
      }

      const evtUpdated = await EventModel.findByIdAndUpdate(event_id, updateEvent, {new: true});

      return res.json({
        ok: true,
        msg: "El evento se ha actualizado correctamente",
        event: evtUpdated
      })

    }catch(error){
      handleError(error, res);
    }


  }

  public async deleteEvent(req: Request, res: Response) {
    const user_id = req.body.user_token_obj.user_id;
    const event_id = req.params.id;

    try{
       const event: any = await EventModel.findById(event_id);

      if(!event){
        return res.status(404).json({
          ok: false,
          msg: "El evento que desea eliminar no existe"
        })
      }

      if (event.user.toString() !== user_id){
        return res.status(401).json({
          ok: false,
          msg: "No tiene permisos para poder eliminar el evento"
        })
      }

      await EventModel.findByIdAndRemove(event_id);

      return res.json({
        ok: true,
        msg: "El evento se ha eliminado correctamente"
      })

    }catch(error){
      handleError(error, res);
    }


  }


}

export const eventController = new EventController();
