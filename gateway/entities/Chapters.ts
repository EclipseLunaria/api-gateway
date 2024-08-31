import { Entity, Column, OneToOne } from "typeorm";
import MangaMetadata from "./SeriesMetadata";

@Entity()
class Chapter {
  @Column({ primary: true })
  chapter_id: string;

  @Column({ primary: true })
  manga_id: string;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column({ default: false })
  is_collected: boolean;

  @OneToOne(() => MangaMetadata, (metadata) => metadata.manga_id)
  metadata: MangaMetadata;
}

export default Chapter;
