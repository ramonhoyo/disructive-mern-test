import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUserModel: jest.Mock = jest.fn();

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of users', async () => {
    throw new Error('Test not implemented');
  });

  it('should create a user', async () => {
    throw new Error('Test not implemented');
  });

  it('should return a user', async () => {
    throw new Error('Test not implemented');
  });

  it('should update a user', async () => {
    throw new Error('Test not implemented');
  });

  it('should throw an error if username already exist', async () => {
    throw new Error('Test not implemented');
  });

  it('should throw an error if email already exist', async () => {
    throw new Error('Test not implemented');
  });
});
