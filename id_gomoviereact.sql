--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    genre_name character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying,
    description text,
    year integer,
    release_date date,
    runtime integer,
    rating integer,
    mpaa_rating character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: movies_genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.movies_genres (
    id integer NOT NULL,
    movie_id integer,
    genre_id integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


--
-- Name: movies_genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movies_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movies_genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movies_genres_id_seq OWNED BY public.movies_genres.id;


--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Name: movies_genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies_genres ALTER COLUMN id SET DEFAULT nextval('public.movies_genres_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.genres (id, genre_name, created_at, updated_at) FROM stdin;
1	Drama	2021-05-17 00:00:00	2021-05-17 00:00:00
2	Crime	2021-05-17 00:00:00	2021-05-17 00:00:00
3	Action	2021-05-17 00:00:00	2021-05-17 00:00:00
4	Comic Book	2021-05-17 00:00:00	2021-05-17 00:00:00
5	Sci-Fi	2021-05-17 00:00:00	2021-05-17 00:00:00
6	Mystery	2021-05-17 00:00:00	2021-05-17 00:00:00
7	Adventure	2021-05-17 00:00:00	2021-05-17 00:00:00
8	Comedy	2021-05-17 00:00:00	2021-05-17 00:00:00
9	Romance	2021-05-17 00:00:00	2021-05-17 00:00:00
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.movies (id, title, description, year, release_date, runtime, rating, mpaa_rating, created_at, updated_at) FROM stdin;
1	Spy x Family	Corrupt politicians, frenzied nationalists, and other warmongering forces constantly jeopardize the thin veneer of peace between neighboring countries Ostania and Westalis. In spite of their plots, renowned spy and master of disguise Twilight fulfills dangerous missions one after another in the hope that no child will have to experience the horrors of war.	2022	2022-10-14	142	5	R	2021-05-17 00:00:00	2021-05-17 00:00:00
2	One Piece	Gol D. Roger was known as the Pirate King the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world	1999	1999-03-24	175	5	R	2021-05-17 00:00:00	2021-05-17 00:00:00
4	Kaguya-sama wa Kokurasetai	 At the renowned Shuchiin Academy, Miyuki Shirogane and Kaguya Shinomiya are the student bodys top representatives. Ranked the top student in the nation and respected by peers and mentors alike, Miyuki serves as the student council president.	2019	2019-04-14	102	4	R	2021-05-17 00:00:00	2021-05-17 00:00:00
3	Komi-san wa Comyushou desu	Hitohito Tadano is an ordinary boy who heads into his first day of high school with a clear plan: to avoid trouble and do his best to blend in with others. Unfortunately, he fails right away when he takes the seat beside the schools madonna—Shouko Komi.	2021	2021-07-18	152	5	PG13	2021-05-17 00:00:00	2021-05-17 00:00:00
\.


--
-- Data for Name: movies_genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.movies_genres (id, movie_id, genre_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 9, true);


--
-- Name: movies_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movies_genres_id_seq', 1, false);


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.movies_id_seq', 4, true);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: movies_genres movies_genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies_genres
    ADD CONSTRAINT movies_genres_pkey PRIMARY KEY (id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies_genres fk_movie_genries_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies_genres
    ADD CONSTRAINT fk_movie_genries_genre_id FOREIGN KEY (genre_id) REFERENCES public.genres(id);


--
-- Name: movies_genres fk_movie_genries_movie_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.movies_genres
    ADD CONSTRAINT fk_movie_genries_movie_id FOREIGN KEY (movie_id) REFERENCES public.movies(id);


--
-- PostgreSQL database dump complete
--

