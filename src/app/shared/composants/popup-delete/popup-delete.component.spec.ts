import {PopupDeleteComponent} from './popup-delete.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OgiButtonModule} from '@ag2rlamondiale/ogi-lib/button';
import {BackendService} from '@ag2rlamondiale/metis-ng';
import {BackendServiceMock} from '../../../../shared/mock/backend.service.mock';
import {AccessEntrepriseService} from '../../../../service/access-entreprise.service';
import {ModalSucceedService} from '../../../../shared/ogi2/ogi2-modal-succeed/service/modal-succeed.service';
import {DialogModule} from 'primeng/dialog';
import {PreventDoubleClickDirective} from '../../../../shared/directive/prevent-double-click.directive';
import {AccessEntreprise, AccessEntreprisesList} from '../../../../shared/model/accessEntreprisesList';
import {IdentiteeNumerique} from '../../../../shared/model/identiteeNumerique';
import {of} from 'rxjs';
import {RepresentantEntreprise} from '../../../../shared/model/representantEntreprise';


describe('PopupDeleteComponent', () => {
  let component: PopupDeleteComponent;
  let fixture: ComponentFixture<PopupDeleteComponent>;
  let componentHtmlElement: HTMLElement;
  let componentDebugElement: DebugElement;
  const accessEntrepriseServiceSpy =
    jasmine.createSpyObj<AccessEntrepriseService>(['getHabilitationsByIdRepresentant', 'deleteHabilitation']);
  const modalSucceedServiceSpy =
    jasmine.createSpyObj<ModalSucceedService>(['showModalSucceed']);

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        PopupDeleteComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        OgiButtonModule,
        DialogModule,
        PreventDoubleClickDirective
      ],
      providers: [
        {
          provide: ModalSucceedService,
          useValue: modalSucceedServiceSpy
        },
        {
          provide: BackendService,
          useClass: BackendServiceMock
        },
        {
          provide: AccessEntrepriseService,
          useValue: accessEntrepriseServiceSpy
        },

      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(PopupDeleteComponent);
    component = fixture.componentInstance;
    component.showPopupDelete = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have Annuler button on the page', () => {
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-btn');
    expect(button.textContent).toEqual(' Annuler');
  });

  it('should have Retirer l\'entreprise button on the page', () => {
    component.accessEntOrPartDeleted = mockAccessToDeleted;
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#delete-btn');
    expect(button.textContent).toEqual(' Retirer l\'entreprise ');
  });

  it('should call delete when click Retirer l\'entreprise', () => {
   accessEntrepriseServiceSpy.deleteHabilitation.and.returnValue(of(mockAccessEntrpeirseList));
    accessEntrepriseServiceSpy.getHabilitationsByIdRepresentant.and.returnValue(of(mockAccessEntrpeirseList));
    spyOn(component, 'delete').and.callThrough();
    component.delete();
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#delete-btn');
    button.click();
    expect(component.delete).toHaveBeenCalled();
  });

  it('should call closeDialog when click Annuler', () => {
    spyOn(component, 'closeDialog').and.callThrough();
    component.closeDialog();
    let button: HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#cancel-btn');
    button.click();
    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should displayPopup equals to false when closeDialog is called', () => {
    component.closeDialog();
    expect(component.closePopup.observed).toBeFalse();
  });

  it('should call deleteCompte delete when call delete', () => {
    component.identiteeNumerique = mockIdentity;
    spyOn(component, 'deleteCompte').and.callThrough();
    component.deleteCompte();
    component.delete();
    expect(component.deleteCompte).toHaveBeenCalled();
    expect(component.closePopup.observed).toBeFalse();
  });

  it('should call deleteRepresentant when call delete', () => {
    component.representantSelected = new RepresentantEntreprise();
    spyOn(component, 'deleteRepresentant').and.callThrough();
    component.deleteRepresentant();
    component.delete();
    expect(component.deleteRepresentant).toHaveBeenCalled();
    expect(component.closePopup.observed).toBeFalse();
  });

  it('should call deleteAccesEntreprise when call delete', () => {
    accessEntrepriseServiceSpy.deleteHabilitation.and.returnValue(of(mockAccessEntrpeirseList));
    accessEntrepriseServiceSpy.getHabilitationsByIdRepresentant.and.returnValue(of(mockAccessEntrpeirseList));
    component.accessEntOrPartDeleted = mockAccessToDeleted;
    spyOn(component, 'deleteAccesEntreprise').and.callThrough();
    component.deleteAccesEntreprise();
    component.delete();
    expect(component.deleteAccesEntreprise).toHaveBeenCalled();
    expect(component.closePopup.observed).toBeFalse();
  });

});
const mockAccessToDeleted: AccessEntreprise = {
  "idAcces": "15212",
  "sirenAcces": "412665150",
  "raisonSociale": "FEDERATION ADMR DE L ARDECHE",
  "codeStatut": "VAL",
  "idRepresentant": "100",
  "codeEspaceClient": "ENT",
  "isLastHabilitation": true,
  "restrictionAccesEtablissements": [],
  "restrictionAccesMetiers": [
    {
      "idRestrictionMetier": "37133",
      "perimetreRestriction": "INC"
    },
    {
      "idRestrictionMetier": "37136",
      "perimetreRestriction": "INC"
    }
  ],
  "restrictionAccesContrat": [],
  "profils": [
    {
      "codeProfil": "ADMENT",
      "libelleCourt": "Administrateur Entreprise",
      "attributionProfil": "ENT",
      "typeProfil": "ADM",
      "codeEspaceClient": "ENT",
      "perimetreMetier": "ADC"
    },
    {
      "codeProfil": "PRVDCTIJ",
      "libelleCourt": "Gestion des prestations prévoyance",
      "attributionProfil": "ENT",
      "typeProfil": "ACC",
      "codeEspaceClient": "ENT",
      "perimetreMetier": "PRV"
    },
    {
      "codeProfil": "SANAFRA",
      "libelleCourt": "Tous les services Santé",
      "attributionProfil": "ENT",
      "typeProfil": "ACC",
      "codeEspaceClient": "ENT",
      "perimetreMetier": "SAN"
    },
    {
      "codeProfil": "RTSTOT",
      "libelleCourt": "Tous les services retraite supplémentaire",
      "attributionProfil": "ENT",
      "typeProfil": "ACC",
      "codeEspaceClient": "ENT",
      "perimetreMetier": "RTS"
    },
    {
      "codeProfil": "RTCTOT",
      "libelleCourt": "Tous les services Retraite complémentaire",
      "attributionProfil": "ENT",
      "typeProfil": "ACC",
      "codeEspaceClient": "ENT",
      "perimetreMetier": "RTC"
    }
  ],
  "administrator": true
};
const mockIdentity: IdentiteeNumerique = {
  loginFournisseur: "retcomp6",
  codeStatut: "VAL",
  idIdentite: "123",
  idFournisseur: "123"
};

const mockAccessEntrpeirseList: AccessEntreprisesList = {
  accesEntreprises: [
    {
      "idAcces": "15212",
      "sirenAcces": "412665150",
      "raisonSociale": "FEDERATION ADMR DE L ARDECHE",
      "codeStatut": "VAL",
      "idRepresentant": "100",
      "codeEspaceClient": "ENT",
      "isLastHabilitation": true,
      "restrictionAccesEtablissements": [],
      "restrictionAccesMetiers": [
        {
          "idRestrictionMetier": "37133",
          "perimetreRestriction": "INC"
        },
        {
          "idRestrictionMetier": "37136",
          "perimetreRestriction": "INC"
        }
      ],
      "restrictionAccesContrat": [],
      "profils": [
        {
          "codeProfil": "ADMENT",
          "libelleCourt": "Administrateur Entreprise",
          "attributionProfil": "ENT",
          "typeProfil": "ADM",
          "codeEspaceClient": "ENT",
          "perimetreMetier": "ADC"
        },
        {
          "codeProfil": "PRVDCTIJ",
          "libelleCourt": "Gestion des prestations prévoyance",
          "attributionProfil": "ENT",
          "typeProfil": "ACC",
          "codeEspaceClient": "ENT",
          "perimetreMetier": "PRV"
        },
        {
          "codeProfil": "SANAFRA",
          "libelleCourt": "Tous les services Santé",
          "attributionProfil": "ENT",
          "typeProfil": "ACC",
          "codeEspaceClient": "ENT",
          "perimetreMetier": "SAN"
        },
        {
          "codeProfil": "RTSTOT",
          "libelleCourt": "Tous les services retraite supplémentaire",
          "attributionProfil": "ENT",
          "typeProfil": "ACC",
          "codeEspaceClient": "ENT",
          "perimetreMetier": "RTS"
        },
        {
          "codeProfil": "RTCTOT",
          "libelleCourt": "Tous les services Retraite complémentaire",
          "attributionProfil": "ENT",
          "typeProfil": "ACC",
          "codeEspaceClient": "ENT",
          "perimetreMetier": "RTC"
        }
      ],
      "administrator": true
    }
  ]
}

