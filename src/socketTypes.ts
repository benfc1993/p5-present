import { Socket } from 'socket.io'
import { Socket as ClientSocket } from 'socket.io-client'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

export type TransitionData = { slide: number; frame: number }

export interface PresentationListenEventsMap {
  register: () => void
  nextFrame: (data: TransitionData) => void
  prevFrame: (data: TransitionData) => void
}

export interface PresentationEmitEventsMap {
  register: () => TransitionData & { caller: string }
  nextFrame: (data: TransitionData & { caller: string }) => void
  prevFrame: (data: TransitionData & { caller: string }) => void
}

export type PresentationServerSocket = Socket<
  PresentationListenEventsMap,
  PresentationEmitEventsMap,
  DefaultEventsMap,
  any
>

export type PresentationSocket = ClientSocket<
  PresentationListenEventsMap,
  PresentationListenEventsMap
>
