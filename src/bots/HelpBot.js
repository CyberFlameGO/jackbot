import { helpBotSays } from '../chat/actions'

export function greetings(username) {
  const responses = [
    `Hi @${username}! You seem lost – type /help for some guidance.`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function helpResponses(username) {
  const responses = [
    `@${username} You realize you're unhelpable, right?`,
    `@${username} I'm just here for card games and petty harassment.`,
    `@${username} I'm busy, ask again later.`,
    `@${username} There's no helping that face, kid.`,
    `@${username} Does your mother know you're here?`,
    `@${username} No.`
  ]

  return responses[Math.floor(Math.random() * (responses.length - 1))]
}

export function greet(dispatch, getState) {
  const { chat } = getState()
  const username = chat.username
  const response = greetings(username)
  return dispatch(helpBotSays(response))
}

export function help(dispatch, getState) {
  const { chat } = getState()
  const username = chat.username
  const response = helpResponses(username)
  return dispatch(helpBotSays(response))
}