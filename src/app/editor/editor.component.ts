import { Component, Injector, Type } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NavbarPortfolioComponent } from '../navbar-portfolio/navbar-portfolio.component';
import { SectionPortfolioComponent } from '../section-portfolio/section-portfolio.component';

interface EditorBlock {
  type?: 'navbar' | 'text' | 'row' | 'column' | 'section';
  component: Type<any>;
  layout: 'column' | 'row';
  content?: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})
export class EditorComponent {
  editorBlocks: EditorBlock[] = [];
  layout: 'column' | 'row' = 'column';

  drop(event: CdkDragDrop<EditorBlock[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.editorBlocks,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const blockData = event.item.data;

      if (blockData.component === NavbarPortfolioComponent) {
        this.editorBlocks.push({
          type: 'navbar',
          component: blockData.component,
          layout: this.layout,
        });
      } else if (blockData.component === SectionPortfolioComponent) {
        this.editorBlocks.push({
          type: 'section',
          component: blockData.component,
          layout: this.layout,
        });
      } else {
        this.editorBlocks.push({
          component: blockData.component,
          layout: this.layout,
        });
      }
    }
  }

  setLayout(newLayout: 'column' | 'row') {
    this.layout = newLayout;

    this.editorBlocks.forEach((block) => {
      if (block.component === NavbarPortfolioComponent) {
        block.layout = this.layout;
      }
    });
  }

  removeBlock(index: number) {
    this.editorBlocks.splice(index, 1);
  }
  createInjector(layout: 'column' | 'row') {
    const injector = Injector.create({
      providers: [{ provide: 'layout', useValue: layout }],
    });
    return injector;
  }
  savePortfolio() {
    const editorHTML = this.getEditorHTML();
    const payload = {
      html: editorHTML,
    };

    console.log('Code html ', payload);
  }

  getEditorHTML(): string {
    let html = '<div class="portfolio">';

    this.editorBlocks.forEach((block) => {
      switch (block.type) {
        case 'navbar':
          html += `<app-navbar layout="${block.layout}"></app-navbar>`;
          break;
        case 'text':
          html += `<div class="text-block">${block.content}</div>`;
          break;
        case 'column':
          html += '<div class="flex flex-col">';
          break;
        case 'row':
          html += '<div class="flex flex-row">';
          break;
        case 'section':
          html += `<app-section-portfolio layout="${block.layout}"></app-section-portfolio>`;
          break;
      }
      html += '</div>';
    });
    html += '</div>';
    return html;
  }
}
