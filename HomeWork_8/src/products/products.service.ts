import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {
  private products = []
  private idCounter = 1

  getAll() {
    return this.products
  }

  getById(id: string) {
    return this.products.find(product => product.id === id)
  }

  create(productDto: CreateProductDto) {
    this.products.push({
      ...productDto, 
      id: this.idCounter
    })
    this.idCounter++
    return this.products
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const index = this.products.findIndex(product => product.id === id)
    this.products[index] = {
      ...updateProductDto, 
      id: id
    }
    return this.products
  }

  remove(id: number) {
    const index = this.products.findIndex(product => product.id === id)
    if (index !== -1) {
      this.products.splice(index, 1)
    } 
    return this.products
  }
}
