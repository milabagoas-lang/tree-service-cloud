-- Restrict SECURITY DEFINER helpers so signed-in users cannot execute them directly.
-- has_role is only referenced inside RLS policies (evaluated by the table owner) and
-- grant_admin_for_owner is only fired by an auth.users trigger, so neither needs
-- EXECUTE for anon/authenticated/PUBLIC.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_admin_for_owner() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.grant_admin_for_owner() TO service_role;