import { inject } from '@angular/core/testing';
import { List } from './../list';
import { ListService } from '../list.service';
import { ProductService } from '../product.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-product-templates',
  templateUrl: './product-templates.component.html',
  styleUrls: ['./product-templates.component.css']
})
export class ProductTemplatesComponent implements OnInit {

  lists: List[];

  productCreationForm = false;
  productDesignInput = false;

  currentListForProduct;
  model = {};

  currentProduct;
  s;
  canvasDesignCode;
  currentProductDesignIndex = 0;

  imageBuffer;
  isUploadingCanvasBuffer = false;

  isDesignCodeRendering = true; // toggles live code preview

  // tslint:disable-next-line: max-line-length
  content = 'var canvas = document.getElementById("pane");\nvar context = canvas.getContext("2d");\n\nvar listItem = "{{ listItem }}";\n\ncontext.clearRect(0, 0, canvas.width, canvas.height);\n\ncontext.fillStyle = "rgba(0, 0, 250, 0.5)";\ncontext.font = "20px Georgia";\ncontext.fillText(listItem, 55, 50);';


  getLists(): void {
    this.listService.getLists()
      .subscribe(lists => this.lists = lists);
  }

  createNewProduct(newProductList) {

    this.productCreationForm = true;
    this.currentListForProduct = newProductList;

  }

  submitProduct(formData) {

    this.productDesignInput = true;
    this.currentProduct = {
      name: formData.controls.productName.value,
      width: formData.controls.productWidth.value,
      height: formData.controls.productHeight.value,
      listId: this.currentListForProduct._id,
      isNew: true
    };

  }

  changeListIndex(inc) {
    if ((Number(this.currentProductDesignIndex) + inc) < 0 ||
        (Number(this.currentProductDesignIndex) + inc) > this.currentListForProduct.contents.length) {
    } else {
      this.currentProductDesignIndex = Number(this.currentProductDesignIndex) + inc;
      this.onCanvasChange();
    }
  }

  onCanvasChange() {
    if (this.isDesignCodeRendering) {
      this.canvasDesignCode = this.content.replace('{{ listItem }}',
      this.currentListForProduct.contents[this.currentProductDesignIndex].name);
      this.s = document.createElement('script');
      this.s.text = this.canvasDesignCode;
      this.document.getElementsByTagName('head')[0].appendChild(this.s);
    }
  }

  saveProductDesign() {

    this.currentProduct.canvasCode = this.content;

    this.productService.saveProduct(this.currentProduct)
    .subscribe(() => {
      this.getLists();
  });
  }

  editProduct(productObj) {
    this.productDesignInput = true;
    productObj.isNew = false;
    this.currentProduct = productObj;
    this.content = productObj.canvasCode;
  }

  deleteProduct(productObj) {
    this.productService.deleteProduct(productObj)
    .subscribe(() => {
      this.getLists();
  });

  }


  saveCanvasToStage() {
    this.isUploadingCanvasBuffer = true;

    setTimeout(() => {
      this.canvasSaveFunction();
 }, 100);
  }

  canvasSaveFunction() {
    const canvas = document.getElementById('pane') as HTMLCanvasElement;
    this.imageBuffer = canvas.toDataURL();
    this.productService.bufferToStage({ buffer : canvas.toDataURL() })
    .subscribe(() => {
      console.log('SERVER RESPONDS');
      this.isUploadingCanvasBuffer = false;
    });
  }

  constructor(private listService: ListService,
              private productService: ProductService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.getLists();
  }

}
