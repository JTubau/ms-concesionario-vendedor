import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {UsuarioVendedor} from './usuario-vendedor.model';

@model()
export class Vendedor extends Entity {
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
    required: true,
  })
  correo: string;

  @hasMany(() => Cliente, {keyTo: 'id_vendedor'})
  clientes: Cliente[];

  @hasOne(() => UsuarioVendedor, {keyTo: 'id_vendedor'})
  tiene_usuario: UsuarioVendedor;

  constructor(data?: Partial<Vendedor>) {
    super(data);
  }
}

export interface VendedorRelations {
  // describe navigational properties here
}

export type VendedorWithRelations = Vendedor & VendedorRelations;
