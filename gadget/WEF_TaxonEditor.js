/**
 * This JavaScrtipt is a implementation of JavaScript Gadget to edit taxonal
 * information on Wikidata. This script is based on WE-Framework.
 * 
 * @see https://github.com/vlsergey/WE-Framework
 * @author vlsergey
 */
var wef_TaxonEditor_html = '<div class="wef_taxonEditor_dialog"><div class="wef_tabs"><ul><li><a href="#wef_taxonEditor_tab_general" class="wef_i18n_text">groupGeneral</a></li><li><a href="#wef_taxonEditor_tab_biology" class="wef_i18n_text">groupBiology</a></li><li><a href="#wef_taxonEditor_tab_databases" class="wef_i18n_text">groupDatabases</a></li></ul><div id="wef_taxonEditor_tab_general"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetGeneral</legend><table><tbody class="wef_claim_editors" data-code="P31" data-datatype="wikibase-item"/></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetScientificNane</legend><table><tbody class="wef_claim_editors" data-code="P225" data-datatype="string"><tr data-code="P405" data-datatype="wikibase-item"/><tr class="wef_claim_editors" data-code="P574" data-datatype="time"/><tr data-code="P1135" data-datatype="wikibase-item"/><tr data-code="P1353" data-datatype="string"/></tbody><tbody class="wef_claim_editors" data-code="P428" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P835" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P566" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1403" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P694" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P1420" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P697" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P944" data-datatype="wikibase-item"/></table></fieldset></div><div id="wef_taxonEditor_tab_biology"><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetSystematics</legend><table><tbody class="wef_claim_editors" data-code="P105" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P171" data-datatype="wikibase-item"><tr data-code="P678" data-datatype="wikibase-item"/></tbody></table></fieldset><fieldset class="wef_fieldset"><legend class="wef_i18n_text">fieldsetRedListStatus</legend><table><tbody class="wef_claim_editors" data-code="P141" data-datatype="wikibase-item"/></table></fieldset><table><tbody class="wef_claim_editors" data-code="P181" data-datatype="commonsMedia"/><tbody class="wef_claim_editors" data-code="P183" data-datatype="wikibase-item"/><tbody class="wef_claim_editors" data-code="P523" data-datatype="time"/><tbody class="wef_claim_editors" data-code="P524" data-datatype="time"/></table></div><div id="wef_taxonEditor_tab_databases"><table><tbody class="wef_claim_editors" data-code="P627" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P685" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P687" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P815" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P830" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P838" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P846" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P850" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P938" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P959" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P960" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P961" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P962" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P1070" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P1076" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P1348" data-datatype="url"/><tbody class="wef_claim_editors" data-code="P1391" data-datatype="string"/><tbody class="wef_claim_editors" data-code="P1421" data-datatype="url"/></table></div></div></div>';

var wef_TaxonEditor_i18n_en = {

	dialogButtonUpdateLabelsText: 'Update labels',
	dialogButtonUpdateLabelsLabel: 'Redownload properties, qualificator and objects labels and descriptions from Wikidata',
	dialogButtonSaveText: 'Save',
	dialogButtonSaveLabel: 'Close the dialog and save all changes to Wikidata',
	dialogButtonCloseText: 'Cancel',
	dialogButtonCloseLabel: 'Close the dialog and discard all changes (do not save)',
	dialogTitle: 'Taxon data — WE-Framework',

	fieldsetGeneral: 'general',
	fieldsetScientificNane: 'scientific nane',
	fieldsetSystematics: 'systematics',
	fieldsetRedListStatus: 'Red List status',

	groupGeneral: 'General',
	groupBiology: 'Biology',
	groupDatabases: 'Databases',

	errorLoadingWikidata: 'Unable to load element data from Wikidata',

	menuButton: 'WEF: Taxon',

	statusLoadingWikidata: 'Loading element data from Wikidata',
};

var wef_TaxonEditor_i18n_fr = {

	dialogButtonUpdateLabelsText: 'Mettre à jour les libellés',
	dialogButtonUpdateLabelsLabel: 'Recharger les labels et descriptions des propriétés, qualificatifs et objets',
	dialogButtonSaveText: 'Enregistrer',
	dialogButtonSaveLabel: 'Fermer la fenêtre en enregistrant les modifications sur Wikidata',
	dialogButtonCloseText: 'Annuler',
	dialogButtonCloseLabel: 'Fermer la fenêtre sans enregistrer',

	fieldsetGeneral: 'Général',
	groupGeneral: 'Général',

	errorLoadingWikidata: 'Échec du chargement des données de Wikidata',

	statusLoadingWikidata: 'Chargement des données de Wikidata',
};

var wef_TaxonEditor_i18n_ru = {

	dialogButtonUpdateLabelsText: 'Обновить названия',
	dialogButtonUpdateLabelsLabel: 'Заново загрузить названия полей, квалификаторов и объектов с Викиданных',
	dialogButtonSaveText: 'Сохранить',
	dialogButtonSaveLabel: 'Закрыть окно и сохранить все изменения в Викиданных',
	dialogButtonCloseText: 'Отмена',
	dialogButtonCloseLabel: 'Закрыть окно и отменить все изменения (не сохранять)',
	dialogTitle: 'Свойства таксона — WE-Framework',

	fieldsetGeneral: 'основное',
	fieldsetScientificNane: 'научное название',
	fieldsetSystematics: 'систематика',
	fieldsetRedListStatus: 'охранный статус',

	groupGeneral: 'Основное',
	groupBiology: 'Биология',
	groupDatabases: 'Базы данных',

	errorLoadingWikidata: 'Невозможно загрузить информацию с Викиданных',

	menuButton: 'WEF: Таксон',

	statusLoadingWikidata: 'Загружаем данные элемента с Викиданных',
};

/**
 * @class
 */
var WEF_TaxonEditor = function() {

	this.i18n = {};
	var i18n = this.i18n;

	var URI_PREFIX;
	var entityId;

	if ( WEF_Utils.isWikidata() ) {
		entityId = mw.config.get( 'wgTitle' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?format=json';
	} else {
		entityId = mw.config.get( 'wgWikibaseItemId' );
		URI_PREFIX = '//www.wikidata.org/w/api.php?origin=' + encodeURIComponent( location.protocol + wgServer ) + '&format=json';
	}

	this.enabled = /^Q\d+$/.test( entityId );

	this.init = function() {
		WEF_Utils.localize( i18n, 'wef_TaxonEditor_i18n_' );
	};

	this.addEditButtons = function() {
		if ( !this.enabled ) {
			return;
		}

		$( "#p-tb div ul" ).append( $( '<li class="plainlinks"><a href="javascript:wef_TaxonEditor.edit()">' + i18n.menuButton + '</a></li>' ) );
	};

	var DialogForm = function() {

		/** @type {WEF_ClaimEditorsTable[]} */
		var claimEditorsTables = [];

		var dialog = $( wef_TaxonEditor_html );
		dialog.attr( 'title', i18n.dialogTitle );

		dialog.find( '.wef_i18n_text' ).each( function( i, htmlItem ) {
			var item = $( htmlItem );
			if ( typeof i18n[item.text()] !== 'undefined' ) {
				item.text( i18n[item.text()] );
			}
		} );

		dialog.find( '.wef_claim_editors' ).each( function( i, htmlItem ) {
			var item = $( htmlItem );

			var code = item.data( 'code' );
			var datatype = item.data( 'datatype' );
			var label = item.data( 'label' );
			if ( typeof label === 'undefined' ) {
				label = code;
			}

			var definition = new WEF_Definition( {
				code: code,
				datatype: datatype,
				label: label,
				qualifiers: [],
			} );

			item.find( "tr" ).each( function( k, qItem ) {
				var qualifier = $( qItem );
				var qDefinition = new WEF_Definition( {
					code: qualifier.data( 'code' ),
					datatype: qualifier.data( 'datatype' ),
					label: qualifier.data( 'label' ),
				} );
				definition.qualifiers.push( qDefinition );
			} );

			var claimEditorTable = new WEF_ClaimEditorsTable( definition );
			claimEditorsTables.push( claimEditorTable );
			claimEditorTable.replaceAll( item );
		} );

		dialog.find( '.wef_tabs' ).tabs();
		dialog.dialog( {
			autoOpen: false,
			width: 900,
			buttons: [ {
				text: i18n.dialogButtonUpdateLabelsText,
				label: i18n.dialogButtonUpdateLabelsLabel,
				click: function() {
					wef_LabelsCache.clearCacheAndRequeue();
					wef_LabelsCache.receiveLabels();
				},
				style: 'position: absolute; left: 1em;',
			}, {
				text: i18n.dialogButtonSaveText,
				label: i18n.dialogButtonSaveLabel,
				click: function() {
					dialog.dialog( 'close' );
					wef_save( claimEditorsTables );
				},
			}, {
				text: i18n.dialogButtonCloseText,
				label: i18n.dialogButtonCloseLabel,
				click: function() {
					$( this ).dialog( "close" );
				}
			} ],
		} );

		this.load = function( entity ) {
			$.each( claimEditorsTables, function( i, claimEditorsTable ) {
				claimEditorsTable.init( entity );
			} );
		};

		this.open = function() {
			dialog.dialog( 'open' );
		};
	};

	this.edit = function() {
		var statusDialog = $( '<div></div>' );
		statusDialog.attr( 'title', i18n.dialogTitle );
		statusDialog.append( $( '<p></p>' ).text( i18n.statusLoadingWikidata ) );
		statusDialog.dialog();

		$.ajax( {
			type: 'GET',
			url: URI_PREFIX + '&action=wbgetentities&ids=' + entityId,
			dataType: "json",
			success: function( result ) {
				var dialogForm = new DialogForm();
				dialogForm.load( result.entities[entityId] );
				wef_LabelsCache.receiveLabels();
				dialogForm.open();
			},
			complete: function() {
				statusDialog.dialog( 'close' );
			},
			fail: function() {
				alert( i18n.errorLoadingWikidata );
			},
		} );
	};
};

if ( wgServerName === 'ru.wikipedia.org' ) {
	importScript( 'MediaWiki:RuWikiFlagsHtml.js' );
	importStylesheet( 'MediaWiki:WEF_TaxonEditor.css' );
	importScript( 'MediaWiki:WEF_Editors.js' );
	importStylesheet( 'MediaWiki:WEF_Editors.css' );
} else {
	mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_TaxonEditor.css&action=raw&ctype=text/css&maxage=86400', 'text/css' );

	if ( !window.wef_loadingMarker_RuWikiFlagsHtml ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:RuWikiFlagsHtml.js&action=raw&ctype=text/javascript&maxage=86400' );
		window.wef_loadingMarker_RuWikiFlagsHtml = true;
	}

	if ( !window.wef_loadingMarker_Editors ) {
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.js&action=raw&ctype=text/javascript&maxage=86400' );
		mediaWiki.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:WEF_Editors.css&action=raw&ctype=text/css&maxage=86400', 'text/css' );
		window.wef_loadingMarker_Editors = true;
	}
}

mediaWiki.loader.using( [ 'jquery.ui.autocomplete', 'jquery.ui.datepicker', 'jquery.ui.dialog', 'jquery.ui.selectable', 'jquery.ui.tabs' ], function() {
	addOnloadHook( function() {
		wef_TaxonEditor = new WEF_TaxonEditor();
		wef_TaxonEditor.init();
		wef_TaxonEditor.addEditButtons();
	} );
} );
