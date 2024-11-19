import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_vendedor_usuario: {
        name: 'fk_vendedor_usuario',
        entity: 'Vendedor',
        entityKey: 'id',
        foreignKey: 'id_vendedor'
      }
    }
  }
})
export class UsuarioVendedor extends Entity {
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
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'number',
  })
  id_vendedor?: number;

  constructor(data?: Partial<UsuarioVendedor>) {
    super(data);
  }
}

export interface UsuarioVendedorRelations {
  // describe navigational properties here
}

export type UsuarioVendedorWithRelations = UsuarioVendedor & UsuarioVendedorRelations;
