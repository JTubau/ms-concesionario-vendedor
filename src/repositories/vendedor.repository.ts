import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {ConcesionarioDbDataSource} from '../datasources';
import {Vendedor, VendedorRelations, Cliente, UsuarioVendedor} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioVendedorRepository} from './usuario-vendedor.repository';

export class VendedorRepository extends DefaultCrudRepository<
  Vendedor,
  typeof Vendedor.prototype.id,
  VendedorRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof Vendedor.prototype.id>;

  public readonly tiene_usuario: HasOneRepositoryFactory<UsuarioVendedor, typeof Vendedor.prototype.id>;

  constructor(
    @inject('datasources.concesionarioDB') dataSource: ConcesionarioDbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioVendedorRepository') protected usuarioVendedorRepositoryGetter: Getter<UsuarioVendedorRepository>,
  ) {
    super(Vendedor, dataSource);
    this.tiene_usuario = this.createHasOneRepositoryFactoryFor('tiene_usuario', usuarioVendedorRepositoryGetter);
    this.registerInclusionResolver('tiene_usuario', this.tiene_usuario.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
