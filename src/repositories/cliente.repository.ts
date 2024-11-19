import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConcesionarioDbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Vendedor} from '../models';
import {VendedorRepository} from './vendedor.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly es_vendedor: BelongsToAccessor<Vendedor, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.concesionarioDB') dataSource: ConcesionarioDbDataSource, @repository.getter('VendedorRepository') protected vendedorRepositoryGetter: Getter<VendedorRepository>,
  ) {
    super(Cliente, dataSource);
    this.es_vendedor = this.createBelongsToAccessorFor('es_vendedor', vendedorRepositoryGetter,);
    this.registerInclusionResolver('es_vendedor', this.es_vendedor.inclusionResolver);
  }
}
