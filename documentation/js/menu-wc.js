'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">shopping documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' : 'data-target="#xs-components-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' :
                                            'id="xs-components-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeItemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeItemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeStartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeStartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShoppingListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ShoppingListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' : 'data-target="#xs-directives-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' :
                                        'id="xs-directives-links-module-AppModule-8e2182e733d4b586250c92cf440cc5942428c16a03bfb5ea1cd48dbee6029f325dde52d9d805b53d6266ac7644a8bcd7920c572eb5a9079c512c550802b51781"' }>
                                        <li class="link">
                                            <a href="directives/DropdownDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Ingredient.html" data-type="entity-link" >Ingredient</a>
                            </li>
                            <li class="link">
                                <a href="classes/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link" >RecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShoppingService.html" data-type="entity-link" >ShoppingService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IIngredient.html" data-type="entity-link" >IIngredient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IRecipe.html" data-type="entity-link" >IRecipe</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});