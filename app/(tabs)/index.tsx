import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import axios from 'axios'
import { NewsDataType } from '@/types'
import BreakingNews from '@/components/BreakingNews'
import Catogories from '@/components/Catogories'
import NewsList from '@/components/NewsList'
import Loading from '@/components/Loading'



type Props = {}

const Page = (props: Props) => {
  const {top : safeTop} = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([])
  const [isloading, setIsLoading] = useState(true)

  useEffect(() => {
    getBreakingNews();
    getNews();
  },[])

  const getBreakingNews = async () => {
    try{
      const URL = `https://newsdata.io/api/1/news?apikey=pub_67356b347cb6f52c6bd5d1189b8e6303d4c19&country=in&language=en&image=1&removeduplicate=1&size=5`
      const response = await axios .get(URL);

      if(response && response.data){
        setBreakingNews(response.data.results);
        setIsLoading(false)
      }
    } catch(err: any) {
      console.log('Error Message :', err.message)
    }
  }
  const getNews = async ( category:string = '') => {
    try{
      let categoryString = '';
      if( category.length !== 0 ){
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=pub_67356b347cb6f52c6bd5d1189b8e6303d4c19&country=in&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios .get(URL);

      if(response && response.data){
        setNews(response.data.results);
        setIsLoading(false)
      }
    } catch(err: any) {
      console.log('Error Message :', err.message)
    }
  }

const onCatChanged = (category: string) => {
  console.log('Category: ', category);
  setNews([]);
  getNews(category)
} 

  return (
    <ScrollView style={[styles.container, {paddingTop: safeTop}]}>
    <Header/>
    <SearchBar/>
    {
      isloading ? (
        <Loading size={'large'} />
      ) : (
        <BreakingNews newsList={breakingNews}/>
      )
    }
   <Catogories onCategoryChanged={onCatChanged}/>
   <NewsList newsList={news}/>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
})