import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Vendedor} from './vendedor.model';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_vendedor: {
        name: 'fk_cliente_vendedor',
        entity: 'Vendedor',
        entityKey: 'id',
        foreignKey: 'id_vendedor'
      }
    }
  }
})
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  dni: string;

  @property({
    type: 'number',
    required: true,
  })
  telefono: number;

  @property({
    type: 'string',
  })
  correo?: string;

  @belongsTo(() => Vendedor, {name: 'es_vendedor'})
  id_vendedor: number;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
