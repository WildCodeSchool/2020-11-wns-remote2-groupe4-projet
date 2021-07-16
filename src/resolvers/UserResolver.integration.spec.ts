import createTestClient from 'supertest';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

import { getExpressServer } from '../express-server';
import UserSession from '../models/UserSession';
import AppUser from '../models/AppUser';
import Message from '../models/Message';
import Channel from '../models/Channel';
import CalendarEvent from '../models/CalendarEvent';

describe('AppUser resolvers', () => {
  let testClient;

  beforeEach(async () => {
    const connectionOptions = await getConnectionOptions();
    await createConnection({
      ...connectionOptions,
      dropSchema: true,
      entities: [AppUser, UserSession, Message, Channel, CalendarEvent],
      synchronize: true,
      logging: false,
    });
    const { expressServer } = await getExpressServer();
    testClient = createTestClient(expressServer);
  });

  afterEach(() => {
    const conn = getConnection();
    return conn.close();
  });

  describe('Query AppUsers', () => {
    it('returns all Users', async () => {
      const user1 = AppUser.create({
        firstname: 'Georges',
        lastname: 'Abitbol',
        email: 'georges@free.fr',
        password: 'aaaaaaaa',
        phone: '0215474623',
        address: '2 rue bidon',
      });
      await user1.save();

      const user2 = AppUser.create({
        firstname: 'Joe',
        lastname: 'Dalton',
        email: 'joe@free.fr',
        password: '12345678',
        phone: '0263527446',
        address: '12 rue au pif',
      });
      await user2.save();

      const response = await testClient.post('/graphql').send({
        query: `{
          users {
            firstname
            lastname
            email
            phone
            address
          }
        }`,
      });
      expect(JSON.parse(response.text).data).toEqual({
        users: [
          {
            firstname: 'Georges',
            lastname: 'Abitbol',
            email: 'georges@free.fr',
            phone: '0215474623',
            address: '2 rue bidon',
          },
          {
            firstname: 'Joe',
            lastname: 'Dalton',
            email: 'joe@free.fr',
            phone: '0263527446',
            address: '12 rue au pif',
          },
        ],
      });
    });
  });

  describe('Am I authenticated ?', () => {
    let user3;

    beforeEach(async () => {
      user3 = AppUser.create({
        firstname: 'Jean',
        lastname: 'Abitbol',
        email: 'jean@free.fr',
        password: 'aaaaaaaa',
        phone: '0215474623',
        address: '3 rue bidon',
      });
      await user3.save();
    });

    describe('mutation create appUser', () => {
      it('create and returns a new appUser', async () => {
        const response = await testClient.post('/graphql').send({
          query: `mutation {
            createUser(
              data: {
                firstname: "Averell",
                lastname: "Dalton",
                email: "averell@free.fr",
                password: "12345678",
                phone: "0263527446",
                address: "12 rue au pif",
              }
            ) {
              firstname
              lastname
              email
            }
          }`,
        });
        expect(JSON.parse(response.text).data).toEqual({
          createUser: {
            firstname: 'Averell',
            lastname: 'Dalton',
            email: 'averell@free.fr',
          },
        });
      });
    });

    describe('when user is authenticated', () => {
      it('returns user', async () => {
        const userSession = UserSession.create({ user: user3 });
        await userSession.save();

        const response = await testClient
          .post('/graphql')
          .set('Cookie', [`sessionId=${userSession.uuid}`])
          .send({
            query: `{
              amIAuthenticated {
                firstname
              }
            }
          `,
          });
        expect(JSON.parse(response.text).data).toEqual({
          amIAuthenticated: {
            firstname: user3.firstname,
          },
        });
      });
    });

    describe('mutation createSession', () => {
      describe('when email does not match existing user', () => {
        it('returns error', async () => {
          const response = await testClient.post('/graphql').send({
            query: `mutation {
              createSession(input: {
                email: "denise@free.fr",
                password: "12345678",
              }) {
                id
                firstname
              }
            }
            `,
          });
          expect(response.text).toMatch('Incorrect username and/or password.');
        });
      });

      describe('when email matches existing user', () => {
        let user4;
        beforeEach(async () => {
          user4 = AppUser.create({
            firstname: 'Jack',
            lastname: 'Dalton',
            email: 'jack@free.fr',
            password: 'aaaaaaaa',
            phone: '0215474623',
            address: '2 rue bidon',
          });
          await user4.save();
        });

        describe('when password does not matches user password', () => {
          it('returns error', async () => {
            const response = await testClient.post('/graphql').send({
              query: `mutation {
                createSession(input: { email: "jack@free.fr", password: "aaaaaaaa" }) {
                  firstname
                  lastname
                }
              }
              `,
            });
            expect(response.text).toMatch(
              'Incorrect username and/or password.'
            );
          });
        });
      });
    });
  });
});
