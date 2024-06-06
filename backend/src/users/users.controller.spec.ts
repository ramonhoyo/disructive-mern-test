import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUserModel: jest.Mock = jest.fn();

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status 200 and an array of users', async () => {
    throw new Error('Test not implemented');
  });

  it('should return status 201 and a user created', async () => {
    throw new Error('Test not implemented');
  });

  it('should return status 200 and the user', async () => {
    throw new Error('Test not implemented');
  });

  it('should return status 404 when user is not found', async () => {
    throw new Error('Test not implemented');
  });

  it('should return status 400 and when username, email are not provider for create a new user', async () => {
    throw new Error('Test not implemented');
  });

  it('should update a user', async () => {
    throw new Error('Test not implemented');
  });

  it('should throw 409 an error if username or email already exist', async () => {
    throw new Error('Test not implemented');
  });
});
