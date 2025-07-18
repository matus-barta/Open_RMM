
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

-- CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."machine_type" AS ENUM (
    'LXC',
    'VM',
    'Physical',
    'Unknown'
);

ALTER TYPE "public"."machine_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."computer" (
    "uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "one_time_key" "text",
    "is_allowed" boolean DEFAULT false NOT NULL,
    "is_added" boolean DEFAULT false NOT NULL,
    "org_unit_id" bigint,
    CONSTRAINT "computer_one_time_key_check" CHECK (("length"("one_time_key") = 64))
);

ALTER TABLE "public"."computer" OWNER TO "postgres";

CREATE OR REPLACE VIEW "public"."computer_with_system_info" AS
SELECT
    NULL::bigint AS "org_unit_id",
    NULL::"uuid" AS "uuid",
    NULL::boolean AS "is_allowed",
    NULL::boolean AS "is_added",
    NULL::"public"."machine_type" AS "machine_type",
    NULL::boolean AS "pending_reboot",
    NULL::"text" AS "computer_name",
    NULL::timestamp with time zone AS "last_bootup_time",
    NULL::"text" AS "os_version",
    NULL::"text" AS "os_name",
    NULL::"text" AS "kernel_version";

ALTER TABLE "public"."computer_with_system_info" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."org_unit" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."org_unit" OWNER TO "postgres";

ALTER TABLE "public"."org_unit" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."org_unit_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE OR REPLACE VIEW "public"."org_unit_with_count" AS
 SELECT "org_unit"."id",
    "org_unit"."name",
    "count"("computer"."uuid") AS "computer_count"
   FROM ("public"."org_unit"
     LEFT JOIN "public"."computer" ON (("org_unit"."id" = "computer"."org_unit_id")))
  GROUP BY "org_unit"."name", "org_unit"."id";

ALTER TABLE "public"."org_unit_with_count" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."system_info" (
    "computer_uuid" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "machine_type" "public"."machine_type" DEFAULT 'Unknown'::"public"."machine_type" NOT NULL,
    "pending_reboot" boolean,
    "computer_name" "text",
    "last_bootup_time" timestamp with time zone,
    "os_version" "text",
    "os_name" "text",
    "kernel_version" "text"
);

ALTER TABLE "public"."system_info" OWNER TO "postgres";

ALTER TABLE ONLY "public"."computer"
    ADD CONSTRAINT "computer_one_time_key_key" UNIQUE ("one_time_key");

ALTER TABLE ONLY "public"."computer"
    ADD CONSTRAINT "computer_pkey" PRIMARY KEY ("uuid");

ALTER TABLE ONLY "public"."org_unit"
    ADD CONSTRAINT "org_unit_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."system_info"
    ADD CONSTRAINT "system_info_pkey" PRIMARY KEY ("computer_uuid");

CREATE OR REPLACE VIEW "public"."computer_with_system_info" AS
 SELECT "computer"."org_unit_id",
    "computer"."uuid",
    "computer"."is_allowed",
    "computer"."is_added",
    "system_info"."machine_type",
    "system_info"."pending_reboot",
    "system_info"."computer_name",
    "system_info"."last_bootup_time",
    "system_info"."os_version",
    "system_info"."os_name",
    "system_info"."kernel_version"
   FROM ("public"."computer"
     LEFT JOIN "public"."system_info" ON (("computer"."uuid" = "system_info"."computer_uuid")))
  GROUP BY "computer"."uuid", "computer"."is_allowed", "computer"."is_added", "system_info"."machine_type", "system_info"."pending_reboot", "system_info"."computer_name", "system_info"."last_bootup_time", "system_info"."os_version", "system_info"."os_name", "system_info"."kernel_version";

ALTER TABLE ONLY "public"."computer"
    ADD CONSTRAINT "public_computer_org_unit_id_fkey" FOREIGN KEY ("org_unit_id") REFERENCES "public"."org_unit"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."system_info"
    ADD CONSTRAINT "public_system_info_computer_uuid_fkey" FOREIGN KEY ("computer_uuid") REFERENCES "public"."computer"("uuid") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "public"."computer" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."org_unit" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."system_info" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."computer" TO "anon";
GRANT ALL ON TABLE "public"."computer" TO "authenticated";
GRANT ALL ON TABLE "public"."computer" TO "service_role";

GRANT ALL ON TABLE "public"."computer_with_system_info" TO "anon";
GRANT ALL ON TABLE "public"."computer_with_system_info" TO "authenticated";
GRANT ALL ON TABLE "public"."computer_with_system_info" TO "service_role";

GRANT ALL ON TABLE "public"."org_unit" TO "anon";
GRANT ALL ON TABLE "public"."org_unit" TO "authenticated";
GRANT ALL ON TABLE "public"."org_unit" TO "service_role";

GRANT ALL ON SEQUENCE "public"."org_unit_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."org_unit_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."org_unit_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."org_unit_with_count" TO "anon";
GRANT ALL ON TABLE "public"."org_unit_with_count" TO "authenticated";
GRANT ALL ON TABLE "public"."org_unit_with_count" TO "service_role";

GRANT ALL ON TABLE "public"."system_info" TO "anon";
GRANT ALL ON TABLE "public"."system_info" TO "authenticated";
GRANT ALL ON TABLE "public"."system_info" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
