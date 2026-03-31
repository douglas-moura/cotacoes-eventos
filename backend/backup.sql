--
-- PostgreSQL database dump
--

\restrict GAbFtNLDZptetPPdVrMUk0oeiehsxXnQdux8lal9kwow8rmA9Ii9vGgoxYNjcLN

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: acessos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.acessos (
    id integer NOT NULL,
    user_id integer NOT NULL,
    dispositivo text NOT NULL,
    data_login timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.acessos OWNER TO postgres;

--
-- Name: acessos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.acessos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.acessos_id_seq OWNER TO postgres;

--
-- Name: acessos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.acessos_id_seq OWNED BY public.acessos.id;


--
-- Name: enderecos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enderecos (
    id integer NOT NULL,
    rua text NOT NULL,
    numero text NOT NULL,
    complemento text,
    referencia text,
    bairro text NOT NULL,
    cidade text NOT NULL,
    uf character(2) NOT NULL,
    espaco_id integer NOT NULL,
    cep text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.enderecos OWNER TO postgres;

--
-- Name: enderecos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enderecos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.enderecos_id_seq OWNER TO postgres;

--
-- Name: enderecos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enderecos_id_seq OWNED BY public.enderecos.id;


--
-- Name: espacos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.espacos (
    id integer NOT NULL,
    nome text NOT NULL,
    proprietario_id integer NOT NULL,
    area double precision,
    capacidade integer,
    ambientes integer,
    "quantidadeBanheiros" integer,
    ativo boolean DEFAULT true NOT NULL,
    descricao text NOT NULL,
    visivel boolean DEFAULT true NOT NULL,
    CONSTRAINT chk_ativo_visivel CHECK (((ativo = true) OR (visivel = false)))
);


ALTER TABLE public.espacos OWNER TO postgres;

--
-- Name: espacos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.espacos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.espacos_id_seq OWNER TO postgres;

--
-- Name: espacos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.espacos_id_seq OWNED BY public.espacos.id;


--
-- Name: infraestruturas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.infraestruturas (
    id integer NOT NULL,
    titulo text NOT NULL,
    icone text
);


ALTER TABLE public.infraestruturas OWNER TO postgres;

--
-- Name: infraestruturas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.infraestruturas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.infraestruturas_id_seq OWNER TO postgres;

--
-- Name: infraestruturas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.infraestruturas_id_seq OWNED BY public.infraestruturas.id;


--
-- Name: rel_espacos_infras; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rel_espacos_infras (
    id integer NOT NULL,
    espaco_id integer NOT NULL,
    infra_id integer NOT NULL
);


ALTER TABLE public.rel_espacos_infras OWNER TO postgres;

--
-- Name: rel_espacos_infras_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rel_espacos_infras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rel_espacos_infras_id_seq OWNER TO postgres;

--
-- Name: rel_espacos_infras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rel_espacos_infras_id_seq OWNED BY public.rel_espacos_infras.id;


--
-- Name: rel_espacos_servicos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rel_espacos_servicos (
    id integer NOT NULL
);


ALTER TABLE public.rel_espacos_servicos OWNER TO postgres;

--
-- Name: rel_espacos_servicos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rel_espacos_servicos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rel_espacos_servicos_id_seq OWNER TO postgres;

--
-- Name: rel_espacos_servicos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rel_espacos_servicos_id_seq OWNED BY public.rel_espacos_servicos.id;


--
-- Name: serv_alimentacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.serv_alimentacao (
    id integer NOT NULL,
    servico_id integer NOT NULL
);


ALTER TABLE public.serv_alimentacao OWNER TO postgres;

--
-- Name: serv_alimentacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.serv_alimentacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.serv_alimentacao_id_seq OWNER TO postgres;

--
-- Name: serv_alimentacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.serv_alimentacao_id_seq OWNED BY public.serv_alimentacao.id;


--
-- Name: serv_bebidas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.serv_bebidas (
    id integer NOT NULL,
    servico_id integer NOT NULL
);


ALTER TABLE public.serv_bebidas OWNER TO postgres;

--
-- Name: serv_bebidas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.serv_bebidas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.serv_bebidas_id_seq OWNER TO postgres;

--
-- Name: serv_bebidas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.serv_bebidas_id_seq OWNED BY public.serv_bebidas.id;


--
-- Name: serv_diarias; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.serv_diarias (
    id integer NOT NULL,
    dia_semana text,
    check_in text DEFAULT '00h00'::text NOT NULL,
    check_out text DEFAULT '00h00'::text NOT NULL,
    ativo boolean DEFAULT true NOT NULL,
    servico_id integer NOT NULL
);


ALTER TABLE public.serv_diarias OWNER TO postgres;

--
-- Name: serv_diarias_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.serv_diarias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.serv_diarias_id_seq OWNER TO postgres;

--
-- Name: serv_diarias_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.serv_diarias_id_seq OWNED BY public.serv_diarias.id;


--
-- Name: servicos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.servicos (
    id integer NOT NULL,
    tipo text NOT NULL,
    valor_base integer NOT NULL,
    valor_promo integer,
    valor_promo_status boolean DEFAULT false NOT NULL,
    tx_pessoa integer,
    tx_pessoa_status boolean DEFAULT false NOT NULL,
    espaco_id integer
);


ALTER TABLE public.servicos OWNER TO postgres;

--
-- Name: servicos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.servicos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.servicos_id_seq OWNER TO postgres;

--
-- Name: servicos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.servicos_id_seq OWNED BY public.servicos.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    email text NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    senha text NOT NULL,
    data_nasc timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: acessos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acessos ALTER COLUMN id SET DEFAULT nextval('public.acessos_id_seq'::regclass);


--
-- Name: enderecos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecos ALTER COLUMN id SET DEFAULT nextval('public.enderecos_id_seq'::regclass);


--
-- Name: espacos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.espacos ALTER COLUMN id SET DEFAULT nextval('public.espacos_id_seq'::regclass);


--
-- Name: infraestruturas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infraestruturas ALTER COLUMN id SET DEFAULT nextval('public.infraestruturas_id_seq'::regclass);


--
-- Name: rel_espacos_infras id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_infras ALTER COLUMN id SET DEFAULT nextval('public.rel_espacos_infras_id_seq'::regclass);


--
-- Name: rel_espacos_servicos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_servicos ALTER COLUMN id SET DEFAULT nextval('public.rel_espacos_servicos_id_seq'::regclass);


--
-- Name: serv_alimentacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_alimentacao ALTER COLUMN id SET DEFAULT nextval('public.serv_alimentacao_id_seq'::regclass);


--
-- Name: serv_bebidas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_bebidas ALTER COLUMN id SET DEFAULT nextval('public.serv_bebidas_id_seq'::regclass);


--
-- Name: serv_diarias id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_diarias ALTER COLUMN id SET DEFAULT nextval('public.serv_diarias_id_seq'::regclass);


--
-- Name: servicos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicos ALTER COLUMN id SET DEFAULT nextval('public.servicos_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
\.


--
-- Data for Name: acessos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.acessos (id, user_id, dispositivo, data_login) FROM stdin;
1	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:15:31.033
2	11	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:16:42.354
3	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:17:55.269
4	45	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:34:41.106
5	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:48:25.664
6	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:57:54.862
7	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 20:59:58.948
8	45	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-09 21:02:00.623
9	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:27:10.395
10	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:27:11.279
11	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:27:23.168
12	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:49:24.111
13	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:55:35.874
14	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 18:57:06.494
15	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 19:02:13.98
16	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 19:08:55.974
17	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-10 19:09:50.797
18	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:12:39.195
19	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:22:56.919
20	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:23:43.117
21	49	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:24:43.021
22	49	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:25:26.043
23	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 17:41:51.642
24	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 18:01:14.831
25	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 18:05:34.777
26	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 18:12:57.017
27	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 18:26:06.557
28	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 19:03:11.058
29	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 19:13:24.499
30	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 19:24:21.835
31	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 19:24:46.192
32	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 19:34:55.635
33	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-11 20:54:17.459
34	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 13:37:08.974
35	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 14:10:36.576
36	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 14:18:24.074
37	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 18:10:26.896
38	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 18:47:38.508
39	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 19:09:40.37
40	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 20:49:59.108
41	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-12 20:51:26.333
42	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-13 12:57:00.818
43	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-13 17:13:43.345
44	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-13 17:16:38.068
45	13	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-16 12:50:40.347
46	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-16 15:20:35.625
47	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-16 15:31:42.787
48	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-16 18:51:14.405
49	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-17 14:32:01.807
50	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-18 13:05:18.608
51	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-18 14:23:45.417
52	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-18 14:24:11.823
53	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-18 18:45:51.988
54	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36	2026-03-18 20:01:35.291
55	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-19 12:43:17.841
56	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-19 14:34:02.337
57	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-19 20:13:40.672
58	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-19 20:44:37.474
59	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-20 13:23:59.23
60	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-20 17:27:02.724
61	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-20 18:54:04.557
62	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-23 14:57:10.698
63	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-23 18:29:53.442
64	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-23 18:56:09.741
65	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-23 19:01:31.117
66	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:07:42.878
67	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:07:59.179
68	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:08:34.931
69	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:09:36.198
70	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:13:11.392
71	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:15:16.107
72	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:16:26.534
73	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:16:57.875
74	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:18:05.797
75	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:42:37.673
76	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:43:23.901
77	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 18:52:29.158
78	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:04:47.64
79	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:09:20.269
80	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:11:11.423
81	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:12:43.718
82	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:25:14.199
83	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 19:33:58.187
84	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-24 20:25:32.521
85	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-25 19:41:34.24
86	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-25 19:42:12.607
87	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-25 19:46:07.038
88	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-26 12:45:29.953
89	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-26 20:59:03.137
90	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-27 12:35:31.851
91	1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36	2026-03-27 17:20:10.845
\.


--
-- Data for Name: enderecos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enderecos (id, rua, numero, complemento, referencia, bairro, cidade, uf, espaco_id, cep, user_id) FROM stdin;
2	Rua Tenente-Aviador Mota Lima	124			City Caxingui	São Paulo	GO	1	05517-030	1
3	Professor Luiz Gualberto	889	Casa	Portão Verde	Vila Mariana	São Paulo	SP	2	12912-520	1
4	Rua Tenente-Aviador Mota Lima	4784			City Caxingui	São Paulo	PA	3	05517-030	1
5	Professor Luiz Gualberto, 183	154			vasdvds	São Paulo	MA	4	05517-030	1
6	Rua Tenente-Aviador Mota Lima, 170	156			City Caxingui	São Paulo	DF	5	05517-030	1
7	Rua Tenente-Aviador Mota Lima, 170	159			City Caxingui	São Paulo	RJ	6	05517-030	1
8	Rua Tenente-Aviador Mota Lima, 170	1474			City Caxingui	São Paulo	MT	7	05517-030	1
9	Rua Tenente-Aviador Mota Lima, 170	154			City Caxingui	São Paulo	MG	8	05517-030	1
10	Rua Tenente-Aviador Mota Lima	145			City Caxingui	São Paulo	PR	9	05517-030	1
11	Rua Tenente-Aviador Mota Lima, 170	999			City Caxingui	São Paulo	PR	10	05517-030	1
12	Rua Tenente-Aviador Mota Lima	445			City Caxingui	São Paulo	ES	11	05517-030	1
13	Rua Tenente-Aviador Mota Lima	665			City Caxingui	São Paulo	MA	12	05517-030	1
14	Rua Nossa Senhora Aparecida	6	Casa 3		Jardim Portal I e II	São Paulo	SP	13	02326-105	1
16	Rua Clodomiro Novaes	104			Jardim Esperança	Ponta Porã	MS	15	79903-308	1
15	Rua Pedro José Samora	488			Santa Mônica	Uberlândia	MG	14	38408-224	1
19	Rua Marília	87	Parque Verde	\N	Jardim Primavera	Americana	SP	18	13467-432	1
18	Rua Dr. Rui Batista Pereira	170	Portão Verde	Casa dos Sertanistas	City Caxingui	São Paulo	SP	17	05517-030	1
17	Rua Dr. Rui Batista Pereira	300	Portão Verde	Casa dos Sertanistas	City Caxingui	São Paulo	SP	16	05517-080	1
\.


--
-- Data for Name: espacos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.espacos (id, nome, proprietario_id, area, capacidade, ambientes, "quantidadeBanheiros", ativo, descricao, visivel) FROM stdin;
3	GreenGo	1	2	2	2	2	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget lorem quis tellus fringilla vehicula vitae quis arcu. Suspendisse quis magna elit. Proin vestibulum diam vitae diam vulputate, sed suscipit tellus iaculis. Ut condimentum tempus tincidunt. Quisque tincidunt porta diam, mollis ultricies diam ultrices at. Suspendisse neque mauris, suscipit eu turpis vel, porttitor consequat libero. Quisque et neque nunc. Aliquam hendrerit egestas accumsan. Integer lacus diam, hendrerit laoreet ph	f
13	New Plaza	1	9	9	9	9	f	Use the bg-radial and bg-radial-[<position>] utilities with the color stop utilities to add a radial gradient to an element:	f
7	vsdfv	1	3	3	3	3	f	vsdfvsd	f
6	GreenGo	1	5	5	5	5	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget lorem quis tellus fringilla vehicula vitae quis arcu. Suspendisse quis magna elit. Proin vestibulum diam vitae diam vulputate, sed suscipit tellus iaculis. Ut condimentum tempus tincidunt. Quisque tincidunt porta diam, mollis ultricies diam ultrices at. Suspendisse neque mauris, suscipit eu turpis vel, porttitor consequat libero. Quisque et neque nunc. Aliquam hendrerit egestas accumsan. Integer lacus diam, hendrerit laoreet ph	f
11	Low Lotus Green	1	5	5	5	5	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate ipsum et justo dignissim pretium. Etiam lobortis mauris ut ultricies auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In suscipit in lorem vel mattis. Morbi suscipit turpis dolor, eu tempus dui mattis sed. Phasellus sit amet tortor sed felis pulvinar semper. Etiam feugiat lacus sit amet augue pharetra, id faucibus nisl iaculis. Integer at pretium libero.	f
1	Teste 15	1	5	8	8	7	f	descr	f
4	Teste 15	1	2	2	2	2	f	teste	f
2	Red Lotus	1	88	150	3	6	f	descr	f
5	vsfv	1	7	7	7	7	f	vdsfvs	f
9	Lotus Low	1	8	8	8	8	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate ipsum et justo dignissim pretium. Etiam lobortis mauris ut ultricies auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In suscipit in lorem vel mattis. Morbi suscipit turpis dolor, eu tempus dui mattis sed. Phasellus sit amet tortor sed felis pulvinar semper. Etiam feugiat lacus sit amet augue pharetra, id faucibus nisl iaculis. Integer at pretium libero.	f
17	CasaAir	1	77	100	3	2	t	Casa incrível, em bairro arborizado. Com espaço externo espetacular para reuniões, festas e eventos dos mais variados tipos para até 100 pessoas.	t
10	Teste	1	4	4	4	4	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate ipsum et justo dignissim pretium. Etiam lobortis mauris ut ultricies auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In suscipit in lorem vel mattis. Morbi suscipit turpis dolor, eu tempus dui mattis sed. Phasellus sit amet tortor sed felis pulvinar semper. Etiam feugiat lacus sit amet augue pharetra, id faucibus nisl iaculis. Integer at pretium libero.	f
8	vsdfvs	1	6	6	6	6	f	vsdfvd	f
12	GreenGo	1	8	8	8	8	f	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate ipsum et justo dignissim pretium. Etiam lobortis mauris ut ultricies auctor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In suscipit in lorem vel mattis. Morbi suscipit turpis dolor, eu tempus dui mattis sed. Phasellus sit amet tortor sed felis pulvinar semper. Etiam feugiat lacus sit amet augue pharetra, id faucibus nisl iaculis. Integer at pretium libero.	f
15	La Esperanza	1	60	50	2	4	f	Receba informações sobre motivação e campanhas de incentivo.	f
18	EMPORIO LOTUS ROSA	1	80	180	6	8	f	A "descrição de teste" (ou caso de teste) é um documento detalhado que define os passos, dados de entrada e resultados esperados para verificar uma funcionalidade específica de um software. Ela documenta como realizar um fluxo (ex: login), garantindo consistência e ajudando na identificação de bugs ou erros.	f
14	IMPERIUM	1	75	100	5	8	f	Nosso objetivo é proporcionar uma transformação positiva no cliente, impulsionando o crescimento das suas entregas. Oferecemos soluções inovadoras e personalizadas, focadas em aumento de performance, promoção da motivação das equipes e aumento significativo dos seus resultados.	f
16	The Greens	1	87	90	3	2	t	Espaço incrível, em bairro arborizado. Com espaço externo espetacular para reuniões, festas e eventos dos mais variados tipos para até 60 pessoas com piscina descoberta e até 90 pessoas sem o uso da piscina.	t
\.


--
-- Data for Name: infraestruturas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.infraestruturas (id, titulo, icone) FROM stdin;
1	Elevador	tabler:elevator
2	Acessibilidade	tabler:disabled
3	Wi-Fi	tabler:wifi
4	Estacionamento	tabler:car
5	Ar-condicionado	tabler:air-conditioning
6	Espaço kids	tabler:mood-kid
7	Varanda	tabler:photo-circle
8	Jardim	tabler:plant
9	Salas de Escritório	tabler:users-group
10	Área coberta	tabler:sun-off
11	Área externa	tabler:sun
12	Telão e Projetor	tabler:screen-share
13	Portaria / recepção	tabler:door-enter
14	Depósito / almoxarifado	tabler:package
15	Cozinha equipada	tabler:cooker
16	Espaço pet friendly	tabler:paw
17	Área instagramável	tabler:brand-instagram
18	Piscina	tabler:pool
19	Churrasqueira	tabler:grill
20	Serviço de buffet	tabler:chef-hat
21	Sistema de som básico	tabler:music
\.


--
-- Data for Name: rel_espacos_infras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rel_espacos_infras (id, espaco_id, infra_id) FROM stdin;
1	11	13
2	11	15
4	11	5
5	11	4
6	12	14
7	12	10
8	12	7
9	12	5
10	12	1
11	12	15
12	12	17
13	12	20
14	12	21
15	13	5
16	13	7
17	13	9
18	13	11
19	13	14
20	13	15
21	13	19
22	13	2
23	13	1
34	15	1
35	15	3
36	15	5
37	15	7
38	15	10
39	15	12
40	15	13
41	15	16
42	15	17
43	15	19
154	18	13
155	18	9
156	18	8
157	18	10
158	17	3
159	17	19
160	17	18
161	17	12
162	17	7
163	17	20
165	17	13
164	17	5
166	16	17
167	16	18
\.


--
-- Data for Name: rel_espacos_servicos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rel_espacos_servicos (id) FROM stdin;
\.


--
-- Data for Name: serv_alimentacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.serv_alimentacao (id, servico_id) FROM stdin;
\.


--
-- Data for Name: serv_bebidas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.serv_bebidas (id, servico_id) FROM stdin;
\.


--
-- Data for Name: serv_diarias; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.serv_diarias (id, dia_semana, check_in, check_out, ativo, servico_id) FROM stdin;
\.


--
-- Data for Name: servicos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.servicos (id, tipo, valor_base, valor_promo, valor_promo_status, tx_pessoa, tx_pessoa_status, espaco_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, "createdAt", email, "isActive", senha, data_nasc) FROM stdin;
6		2026-03-06 18:33:12.193	svdsv	t	789456er	2026-03-09 16:31:54.03
8	rbrebe234wer	2026-03-06 18:39:46.146	svdsvgrerbvsdvsd	t	sdvsdvsd	2026-03-09 16:31:54.03
7	rbrebe	2026-03-06 18:37:04.835	svdsvgrerb	t	13579oiuy	2026-03-09 16:31:54.03
9	vdfvewe	2026-03-06 18:43:24.664	vsadcsaewe	t	123dwed	2026-03-09 16:31:54.03
2		2026-03-06 18:19:32.983	cdeswcxsdc	t	124578ee	2026-03-09 16:31:54.03
10	vdfvewecafvdas	2026-03-06 19:02:13.307	vsadcsaeweacsascv@scdc.vf	t	123dwed	2026-03-09 16:31:54.03
11	Teste	2026-03-06 19:50:11.677	scsdcsdv@sdcsv.com	t	123456ds	2026-03-09 16:31:54.03
12	Teste2	2026-03-06 19:50:48.285	scsdsdfscs@dvsdcsv.com	t	123456ds	2026-03-09 16:31:54.03
46	Doug	2026-03-11 17:06:23.05	doug@dewsd.cd	t	$2b$10$9.bv2zFJtifCJHPnPHvokumSmMfRjNC.mMP56pQSlVHu7DUeQWFYi	\N
47	Doug	2026-03-11 17:08:25.901	doug.s@email.com	t	$2b$10$3pY11rTFVhlXbs0E02kQruhbXM5m690e5Tp8mn2XQNfzpKDcwFQ6q	\N
48	Doug	2026-03-11 17:10:11.726	douglas.souza@email.com	t	$2b$10$HTkY6We7w4SU6jJsNEvJ2euj0Inc8cw/UyMaAIRUOfyZEFz0SQt16	\N
49	Douglas Souza	2026-03-11 17:24:29.44	douglas.souza2@email.com	t	$2b$10$Cs0CK3igKChQqT8K3faU5O9OJeudZLvFOzlfc6m4glZlFbZw0AucW	\N
1	Douglas	2026-03-03 17:18:57.442	douglas@email.com	t	$2b$10$OdcssbA0NGx6F.122wGBVexkOA7wfCimBHJ9Vl8prbztODBaTznfi	2026-03-09 16:31:54.03
13	Douglas Moura	2026-03-09 18:30:10.34	douglas@gtx100.com.br	t	$2b$10$53zAgDf5Z314.OykHwPYyeBprPAjm4eKBLBeJmPIlG6Ex2.AMSkDm	2026-03-09 16:31:54.03
40	Doug	2026-03-09 19:16:39.354	douglas2@email.com	t	123456dw	2026-03-09 16:31:54.03
41	Doug	2026-03-09 19:16:50.691	douglas3@email.com	t	123456dw	2026-03-09 16:31:54.03
42	Doug	2026-03-09 19:17:03.775	douglas5@email.com	t	123456dw	2026-03-09 16:31:54.03
43	Maria Souza	2026-03-09 20:31:53.471	maria.souza@email.com	t	789456123AB	\N
44	Amarildo Ferreira	2026-03-09 20:32:58.9	amarildo@email.com	t	020464AF	\N
45	Sarah Vieira	2026-03-09 20:34:11.403	sarah@email.com	t	280516SA	\N
\.


--
-- Name: acessos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.acessos_id_seq', 91, true);


--
-- Name: enderecos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enderecos_id_seq', 19, true);


--
-- Name: espacos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.espacos_id_seq', 18, true);


--
-- Name: infraestruturas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.infraestruturas_id_seq', 21, true);


--
-- Name: rel_espacos_infras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rel_espacos_infras_id_seq', 167, true);


--
-- Name: rel_espacos_servicos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rel_espacos_servicos_id_seq', 1, false);


--
-- Name: serv_alimentacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.serv_alimentacao_id_seq', 1, false);


--
-- Name: serv_bebidas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.serv_bebidas_id_seq', 1, false);


--
-- Name: serv_diarias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.serv_diarias_id_seq', 1, false);


--
-- Name: servicos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.servicos_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 49, true);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: acessos acessos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acessos
    ADD CONSTRAINT acessos_pkey PRIMARY KEY (id);


--
-- Name: enderecos enderecos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_pkey PRIMARY KEY (id);


--
-- Name: espacos espacos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.espacos
    ADD CONSTRAINT espacos_pkey PRIMARY KEY (id);


--
-- Name: infraestruturas infraestruturas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.infraestruturas
    ADD CONSTRAINT infraestruturas_pkey PRIMARY KEY (id);


--
-- Name: rel_espacos_infras rel_espacos_infras_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_infras
    ADD CONSTRAINT rel_espacos_infras_pkey PRIMARY KEY (id);


--
-- Name: rel_espacos_servicos rel_espacos_servicos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_servicos
    ADD CONSTRAINT rel_espacos_servicos_pkey PRIMARY KEY (id);


--
-- Name: serv_alimentacao serv_alimentacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_alimentacao
    ADD CONSTRAINT serv_alimentacao_pkey PRIMARY KEY (id);


--
-- Name: serv_bebidas serv_bebidas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_bebidas
    ADD CONSTRAINT serv_bebidas_pkey PRIMARY KEY (id);


--
-- Name: serv_diarias serv_diarias_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_diarias
    ADD CONSTRAINT serv_diarias_pkey PRIMARY KEY (id);


--
-- Name: servicos servicos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicos
    ADD CONSTRAINT servicos_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: enderecos_espaco_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX enderecos_espaco_id_key ON public.enderecos USING btree (espaco_id);


--
-- Name: infraestruturas_titulo_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX infraestruturas_titulo_key ON public.infraestruturas USING btree (titulo);


--
-- Name: rel_espacos_infras_espaco_id_infra_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX rel_espacos_infras_espaco_id_infra_id_key ON public.rel_espacos_infras USING btree (espaco_id, infra_id);


--
-- Name: serv_alimentacao_servico_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX serv_alimentacao_servico_id_key ON public.serv_alimentacao USING btree (servico_id);


--
-- Name: serv_bebidas_servico_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX serv_bebidas_servico_id_key ON public.serv_bebidas USING btree (servico_id);


--
-- Name: serv_diarias_servico_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX serv_diarias_servico_id_key ON public.serv_diarias USING btree (servico_id);


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: acessos acessos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.acessos
    ADD CONSTRAINT acessos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enderecos enderecos_espaco_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_espaco_id_fkey FOREIGN KEY (espaco_id) REFERENCES public.espacos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: enderecos enderecos_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enderecos
    ADD CONSTRAINT enderecos_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: espacos espacos_proprietario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.espacos
    ADD CONSTRAINT espacos_proprietario_id_fkey FOREIGN KEY (proprietario_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rel_espacos_infras rel_espacos_infras_espaco_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_infras
    ADD CONSTRAINT rel_espacos_infras_espaco_id_fkey FOREIGN KEY (espaco_id) REFERENCES public.espacos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rel_espacos_infras rel_espacos_infras_infra_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rel_espacos_infras
    ADD CONSTRAINT rel_espacos_infras_infra_id_fkey FOREIGN KEY (infra_id) REFERENCES public.infraestruturas(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: serv_alimentacao serv_alimentacao_servico_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_alimentacao
    ADD CONSTRAINT serv_alimentacao_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: serv_bebidas serv_bebidas_servico_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_bebidas
    ADD CONSTRAINT serv_bebidas_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: serv_diarias serv_diarias_servico_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.serv_diarias
    ADD CONSTRAINT serv_diarias_servico_id_fkey FOREIGN KEY (servico_id) REFERENCES public.servicos(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: servicos servicos_espaco_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.servicos
    ADD CONSTRAINT servicos_espaco_id_fkey FOREIGN KEY (espaco_id) REFERENCES public.espacos(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict GAbFtNLDZptetPPdVrMUk0oeiehsxXnQdux8lal9kwow8rmA9Ii9vGgoxYNjcLN

