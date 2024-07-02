import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { UsersRepository } from '@/repositories/users.repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { GetUserProfileUseCase } from './get-user-profile.usecase'

describe('Get User Profile Use Case', () => {
  let usersRepository: UsersRepository
  let sut: GetUserProfileUseCase

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(createdUser.id)
    expect(user.name).toEqual(createdUser.name)
    expect(user.email).toEqual(createdUser.email)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
