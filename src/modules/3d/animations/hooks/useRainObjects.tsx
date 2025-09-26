import { useEffect, useState, useRef } from 'react'
import { generateId } from '@/modules/common/utils'

// Configuração do intervalo entre cada box que cai (em milissegundos)
const RAIN_INTERVAL = 800 // 800ms = 0.3 segundos entre cada box

type ObjectData = {
  id: string
  title: string
  position: [number, number, number]
  rotation: [number, number, number]
  thumbnail: string
}

export type useRainObjectsProps = {
  objects: ObjectData[]
  isLoading?: boolean
  totalObjects?: number
  loadedObjects?: number
  isLoadingGradually?: boolean
}

export const useRainObjects = ({ objects }: useRainObjectsProps) => {
  const [objectsState, setObjectsState] = useState<ObjectData[]>(objects || [])
  const objectIndexRef = useRef(0)
  const [loadedObjects, setLoadedObjects] = useState(0)

  // Efeito para fazer os games caírem gradualmente quando os dados chegam
  useEffect(() => {
    if (!objects || objects.length === 0) {
      return
    }

    // Reset quando novos dados chegam
    setObjectsState([])
    objectIndexRef.current = 0
    setLoadedObjects(0)

    const interval = setInterval(() => {
      if (objectIndexRef.current >= objects.length) {
        clearInterval(interval)
        return
      }

      const item: ObjectData = objects[objectIndexRef.current]
      const uniqueId = generateId(Number(item.id), objectIndexRef.current)

      const newBox: ObjectData = {
        id: uniqueId,
        thumbnail: item.thumbnail,
        title: item.title,
        position: [
          (Math.random() - 0.5) * 10, // X entre -5 e 5
          Math.random() * 12 + 10, // Y entre 10 e 20 (pra cair de cima)
          (Math.random() - 0.5) * 10, // Z entre -5 e 5
        ],
        rotation: [
          Math.random() * Math.PI * 2, // Rotação X aleatória (0 a 2π radianos)
          Math.random() * Math.PI * 2, // Rotação Y aleatória (0 a 2π radianos)
          Math.random() * Math.PI * 2, // Rotação Z aleatória (0 a 2π radianos)
        ],
      }

      setObjectsState((prev) => [...prev, newBox])
      objectIndexRef.current += 1
      setLoadedObjects(objectIndexRef.current)
    }, RAIN_INTERVAL)

    return () => clearInterval(interval)
  }, [objects])

  if (objectsState.length === 0)
    return {
      items: [],
      isLoading: false,
      totalObjects: 0,
      loadedObjects: 0,
      isLoadingGradually: false,
    }

  return {
    items: objectsState,
    isLoading: false,
    totalObjects: objects?.length || 0,
    loadedObjects: loadedObjects,
    isLoadingGradually: loadedObjects < (objectsState.length || 0),
  }
}
