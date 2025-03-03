import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {Validators} from '@angular/forms';
import {PacificaSelectCommunComponent} from './pacifica-select-commun.component';

describe('PacificaSelectThemComponent', () => {
  let component: PacificaSelectCommunComponent;
  let fixture: ComponentFixture<PacificaSelectCommunComponent>;
  let componentHtmlElement: HTMLElement;
  let componentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacificaSelectCommunComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PacificaSelectCommunComponent);
    component = fixture.componentInstance;
    componentDebugElement = fixture.debugElement; // element de debug relatifs au composant
    componentHtmlElement = componentDebugElement.nativeElement;  // element du DOM
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input siret is present', () => {
    let select = componentDebugElement.nativeElement.querySelector('select');
    expect(select).toBeTruthy();
  });

  it('message error is present', () => {

    component.itemsValue = [
      {label: "label1",
        value: "value1"},
      {label: "label2",
        value: "value2"}];
    component.label = 'libelle';
    component.isRequired = true;

    component.control.setErrors({'required': true});
    component.control.markAsTouched();
    fixture.detectChanges();
    let div = componentDebugElement.nativeElement.querySelector('div.message-error');
    expect(div).toBeTruthy();
  });

  it('validator required are present', () => {
    // Définissez une valeur de test pour data
    component.label = 'Date de naissance';
    component.isRequired = true;
    fixture.detectChanges();
    // Appelez explicitement ngOnInit
    component.ngOnInit();

    // @ts-ignore
    let validatorRequired = component.control.validator(Validators.required);
    expect(validatorRequired).toBeTruthy();
  });


  it('liste of checkbox are present and required', () => {
    component.itemsValue = [
      {label: "Cabinet d'expertise comptable", value: "PCPMCABEXCO"},
      {label: "Etude notariale", value: "PCPMCABNOT"},
      {label: "Cabinet d'avocat", value: "PCPMCABAVO"}
    ];
    component.label = 'Liste des types de mandataires';
    component.isRequired = true;
    fixture.detectChanges();

    let listOption: NodeList[] = componentDebugElement.nativeElement.querySelectorAll('option');
    expect(listOption.length).toEqual(3);
  });


  it('liste of checkbox are present and not required', () => {
    component.itemsValue = [
      {label: "Cabinet d'expertise comptable", value: "PCPMCABEXCO"},
      {label: "Etude notariale", value: "PCPMCABNOT"},
      {label: "Cabinet d'avocat", value: "PCPMCABAVO"}
    ];
    component.label = 'Liste des types de mandataires';
    component.isRequired = false;
    fixture.detectChanges();

    let listOption: NodeList[] = componentDebugElement.nativeElement.querySelectorAll('option');
    expect(listOption.length).toEqual(4);
  });

});
