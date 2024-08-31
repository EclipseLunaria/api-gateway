import { Entity, Column, OneToMany } from "typeorm";
import Chapter from "./Chapters";

@Entity()
class MangaMetadata {
  @Column({ primary: true })
  manga_id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  image: string;

  @Column({nullable:true})
  totalVotes: string;

  @Column({nullable:true})
  ratingAvg: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column("simple-array")
  genres: string[];

  @Column()
  totalChapters: number;

  @OneToMany(() => Chapter, (chapter) => chapter.manga_id)
  chapters: Chapter[];
}

export default MangaMetadata;
