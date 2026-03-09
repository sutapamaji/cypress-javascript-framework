import * as assertHelper from '../../../utils/assertionHelper';
import logger from '../../../utils/logger';

describe('PokeAPI — Pokémon List (GET /pokemon)', () => {
    let response;
    let API_BASE;

    before(() => {
        cy.env(['apiBaseUrl']).then((env) => {
            API_BASE = env.apiBaseUrl;
            logger.info(`Target URL: ${API_BASE}/pokemon`);

            cy.request({
                method: 'GET',
                url: `${API_BASE}/pokemon`,
                failOnStatusCode: false
            }).then((res) => {
                response = res;
            });
        });
    });

    it('should return status 200', () => {
        assertHelper.assertStatus(response, 200);
    });

    it('should have "count" in the response body', () => {
        assertHelper.assertBodyHasKey(response, 'count');
        expect(response.body.count).to.be.a('number');
        expect(response.body.count).to.be.greaterThan(0);
        logger.info(`Total Pokémon count: ${response.body.count}`);
    });

    it('should have "results" as a non-empty array', () => {
        assertHelper.assertBodyHasKey(response, 'results');
        assertHelper.assertIsArray(response.body.results, 'results');
        expect(response.body.results.length).to.be.greaterThan(0);
        logger.info(`Results array length: ${response.body.results.length}`);
    });

    it('should have each item in "results" with "name" (string) and "url" (string)', () => {
        response.body.results.forEach((item, index) => {
            assertHelper.assertIsNonEmptyString(item.name, `results[${index}].name`);
            assertHelper.assertIsNonEmptyString(item.url, `results[${index}].url`);
        });
        logger.info('All items in results have valid name and url');
    });

    it('should return 20 results by default', () => {
        expect(response.body.results).to.have.length(20);
        logger.info('Default limit returns exactly 20 results');
    });

    it('should have "next" and "previous" pagination fields', () => {
        assertHelper.assertBodyHasKey(response, 'next');
        assertHelper.assertBodyHasKey(response, 'previous');

        expect(response.body.next).to.be.a('string');
        logger.info(`next: ${response.body.next}`);

        expect(response.body.previous).to.be.null;
        logger.info('previous is null for the first page (correct)');
    });
});
