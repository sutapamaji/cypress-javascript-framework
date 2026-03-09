import * as assertHelper from '../../../utils/assertionHelper';
import logger from '../../../utils/logger';

describe('PokeAPI — Pokémon Details', () => {
    let API_BASE;
    const pokemonIds = [1, 25, 15];

    pokemonIds.forEach((id) => {
        describe(`Details for Pokémon ID: ${id}`, () => {
            let response;

            before(() => {
                cy.env(['apiBaseUrl']).then((env) => {
                    API_BASE = env.apiBaseUrl;
                    logger.info(`Requesting: GET ${API_BASE}/pokemon/${id}`);

                    cy.request({
                        method: 'GET',
                        url: `${API_BASE}/pokemon/${id}`,
                        failOnStatusCode: false
                    }).then((res) => {
                        response = res;
                    });
                });
            });

            it(`should return status 200 for ID ${id}`, () => {
                assertHelper.assertStatus(response, 200);
            });

            it(`should have correct ID ${id} in response`, () => {
                expect(response.body.id).to.eq(id);
                logger.info(`Verified ID matches: ${response.body.id}`);
            });

            it('should have a name (string)', () => {
                assertHelper.assertIsNonEmptyString(response.body.name, 'name');
            });

            it('should have height and weight as positive numbers', () => {
                assertHelper.assertIsPositiveNumber(response.body.height, 'height');
                assertHelper.assertIsPositiveNumber(response.body.weight, 'weight');
            });

            it('should have "types" as a non-empty array', () => {
                assertHelper.assertIsArray(response.body.types, 'types');
                expect(response.body.types.length).to.be.greaterThan(0);
            });

            it('should have "sprites" with at least a default image', () => {
                assertHelper.assertBodyHasKey(response, 'sprites');
                assertHelper.assertIsNonEmptyString(response.body.sprites.front_default, 'sprites.front_default');
            });

            it('should have "abilities" as an array', () => {
                assertHelper.assertIsArray(response.body.abilities, 'abilities');
            });

            it('should have "base_experience" as a positive number or zero', () => {
                expect(response.body.base_experience).to.be.a('number').and.be.at.least(0);
            });

            it('should have "species" object with name and url', () => {
                assertHelper.assertBodyHasKey(response, 'species');
                assertHelper.assertIsNonEmptyString(response.body.species.name, 'species.name');
                assertHelper.assertIsNonEmptyString(response.body.species.url, 'species.url');
            });

            it('should have valid "moves" structure', () => {
                assertHelper.assertIsArray(response.body.moves, 'moves');
                if (response.body.moves.length > 0) {
                    assertHelper.assertIsNonEmptyString(response.body.moves[0].move.name, 'moves[0].move.name');
                }
            });
        });
    });
});
