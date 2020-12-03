import * as Boom from "@hapi/boom";
import * as Joi from "@hapi/joi";

import BaseRouteSimple from "xhelpers-api/lib/base-route-simple";
import Service from "../services/file.service";

import { uploadFile } from "./schemas/file.schema";
import { data } from "./schemas/json.schema";

const httpResourcePath = "arquivos";

class Routes extends BaseRouteSimple {
  service: Service;
  constructor() {
    super([httpResourcePath]);
    this.service = new Service();

    this.route("POST", `/api/${httpResourcePath}/upload-csv`, {
      description: "Gerar arquivo a partir de dados de um CSV",
      payload: {
        maxBytes: 1e9,
        output: "stream",
        parse: true,
        multipart: true
      },
      plugins: {
        "hapi-swagger": {
          payloadType: "form"
        }
      }
    }, false)
      .validate({ payload: uploadFile })
      .handler(async (r, h, u) => {
        const entity = await this.service.uploadFile(r.payload);
        if (!entity)
          throw Boom.badData();
        return h.response(entity).code(200);
      })
      .build();

    this.route("POST", `/api/${httpResourcePath}`, {
      description: "Gerar arquivo a partir dos dados enviados no payload",
    }, false)
      .validate({ payload: data })
      .handler(async (r, h, u) => {
        const entity = await this.service.create(r.payload);
        if (!entity)
          throw Boom.badData();
        return h.response(entity).code(200);
      })
      .build();

    this.route("GET", `/api/${httpResourcePath}/schema`, {
      description: "Retorna o schema do XML",
    }, false)
      .handler(async (r, h, u) => {
        const entity = await this.service.schema();
        if (!entity)
          throw Boom.badData();
        return h.response(entity).code(200);
      })
      .build();

    this.route("GET", `/api/${httpResourcePath}/demo`, {
      description: "Gerar arquivo demo do XML",
    }, false)
      .validate({
        query: Joi.object({
          TipoArquivo: Joi.string().required().valid("APIX001", "APIX002").description(`
        Tipo de Arquivo:
            APIX001 => Envio recorrente
            APIX002 => Envio sob demanda`)
        })
      })
      .handler(async (r, h, u) => {
        const entity = await this.service.demoFile(r.query);
        if (!entity)
          throw Boom.badData();
        return h.response(entity).code(200);
      })
      .build();
  }
}
module.exports = [...new Routes().buildRoutes()];