import { Box, FlatList, useToast } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';
import { api } from '../services/api';
import { EmptyMyPoolList } from './EmptyMyPoolList';
import { GameProps, Game } from './Game';
import { Loading } from './Loading';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [games, setGames] = useState<GameProps[]>([])
  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')


  async function fetchGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/polls/${poolId}/game`)

      setGames(response.data)
    } catch (error) {
      console.log(error)

      if (error.response?.data?.message === "You cannot send guesses after the game date") {
        return toast.show({
            title: "Não é possivel palpitar nesse jogo, passou da data.",
            placement: "top",
            bgColor: "red.500"
        })}
    

      toast.show({
        title: "Não foi possivel carregar os jogos",
        placement: "top",
        bgColor: "red.500"
      })
    } finally {
      setIsLoading(false)
    }
  }


  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do jogo.",
          placement: "top",
          bgColor: "red.500"
        })
      }

      await api.post(`/polls/${poolId}/games/${gameId}/guesses`,
        { firstTeamPoints: Number(firstTeamPoints), secondTeamPoints: Number(secondTeamPoints) }
      )

      

      toast.show({
        title: "Palpite feito com sucesso.",
        placement: "top",
        bgColor: "green.500"
      })

      fetchGames()
    } catch (error) {
      console.log(error)

      toast.show({
        title: "Não foi possivel enviar o palpite.",
        placement: "top",
        bgColor: "red.500"
      })
    }
  }

  async function handleCodeShare() {
    await Share.share({
         message: code
     })
 }

  useEffect(() => {
    fetchGames()
  }, [poolId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleGuessConfirm(item?.id)}
          valueFirstTeamPoints={item.guess?.firstTeamPoints}
          valueSecondTeamPoints={item.guess?.secondTeamPoints}
        />
      )}
      ListEmptyComponent={() => <EmptyMyPoolList code={code} onShare={handleCodeShare} />}
    />
  );
}
